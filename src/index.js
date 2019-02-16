import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import initialData from './initial-data';
import Column from './Column';

const Container = styled.div`
  display: flex;
`;

class App extends React.Component {
  state = initialData;

  onDragStart = start => {
    const homeIndex = this.state.columnsOrder.indexOf(start.source.droppableId);
    this.setState({
      homeIndex,
    })

  }

  onDragEnd = result => {
    this.setState({
      homeIndex: null,
    })

    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const columnFrom = this.state.columns[source.droppableId];
    const columnTo = this.state.columns[destination.droppableId];

    if (columnFrom === columnTo) {
      const column = this.state.columns[source.droppableId];

      const newTaskIds = [...column.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...column,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState({ ...newState });
    } else {
      const taskIdsFrom = [...columnFrom.taskIds];
      const taskIdsTo = [...columnTo.taskIds];

      taskIdsFrom.splice(source.index, 1);
      taskIdsTo.splice(destination.index, 0, draggableId);

      const newColumnFrom = {
        ...columnFrom,
        taskIds: taskIdsFrom,
      };

      const newColumnTo = {
        ...columnTo,
        taskIds: taskIdsTo,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumnFrom.id]: newColumnFrom,
          [newColumnTo.id]: newColumnTo,
        },
      };

      this.setState({ ...newState });
    }
  };

  render() {
    return (
      <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
        <Container>
          {this.state.columnsOrder.map((columnId, index) => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(
              taskId => this.state.tasks[taskId],
            );

            const isDropDisabled = index < this.state.homeIndex;

            return <Column isDropDisabled={isDropDisabled} key={column.id} tasks={tasks} column={column} />;
          })}
        </Container>
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
