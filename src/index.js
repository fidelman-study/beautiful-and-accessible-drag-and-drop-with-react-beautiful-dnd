import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './Column';

class App extends React.Component {
  state = initialData;

  onDragEnd = result => {
    console.log(result);
  }

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        {this.state.columnsOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

          return <Column key={column.id} tasks={tasks} column={column} />;
        })}
      </DragDropContext>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
