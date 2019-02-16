import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import initialData from './initial-data';
import Column from './Column';

class App extends React.Component {
  state = initialData;

  render() {
    return this.state.columnsOrder.map(columnId => {
      const column = this.state.columns[columnId];
      const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

      return <Column key={column.id} tasks={tasks} column={column} />;
    })
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
