import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task';

const Container = styled.div`
  margin-bottom: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  user-select: none;

  display: flex;
  flex-direction: column;

  background: white;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background 200ms ease;
  background: ${props =>
    props.isDropDisabled ? 'grey' : props.isDraggingOver ? 'grey' : 'inherit'};

  display: flex;
`;

class InnerList extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.tasks !== this.props.tasks;
  }

  render() {
    return this.props.tasks.map((task, index) => (
      <Task index={index} key={task.id} task={task} />
    ));
  }
}


export default class Column extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
        {provided => (
          <Container ref={provided.innerRef} {...provided.draggableProps}>
            <Title {...provided.dragHandleProps}>
              {this.props.column.title}
            </Title>
            <Droppable
              droppableId={this.props.column.id}
              // type={this.props.column.id === 'column-3' ? 'done' : 'active'}
              isDropDisabled={this.props.isDropDisabled}
              direction="horizontal"
              type="task"
            >
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                  isDropDisabled={this.props.isDropDisabled}
                >
                  <InnerList tasks={this.props.tasks} />
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}
