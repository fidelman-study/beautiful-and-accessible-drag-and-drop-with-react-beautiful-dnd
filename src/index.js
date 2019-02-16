import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import initialData from './initial-data';
import Column from './Column';

const Container = styled.div`
  display: block;
`;

class InnerList extends React.PureComponent {
  render() {
    const { column, taskMap, index } = this.props;
    const tasks = column.taskIds.map(taskId => taskMap[taskId]);
    return <Column column={column} tasks={tasks} index={index} />;
  }
}

class App extends React.Component {
  state = initialData;

  onDragStart = start => {
    const homeIndex = this.state.columnsOrder.indexOf(start.source.droppableId);
    this.setState({
      homeIndex,
    });
  };

  onDragEnd = result => {
    this.setState({
      homeIndex: null,
    });

    const { destination, source, draggableId, type } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === 'task') {
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
    } else if (type === 'column') {
      const newColumn = [...this.state.columnsOrder];
      newColumn.splice(source.index, 1);
      newColumn.splice(destination.index, 0, draggableId);
      this.setState({ columnsOrder: newColumn })
    }
  };

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <Droppable
          droppableId="all-columns"
          type="column"
        >
          {provided => (
            <Container ref={provided.innerRef} {...provided.droppableProps}>

              {this.state.columnsOrder.map((columnId, index) => {
                const column = this.state.columns[columnId];

                return (
                  <InnerList
                    key={column.id}
                    column={column}
                    index={index}
                    taskMap={this.state.tasks}
                  />
                );
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
