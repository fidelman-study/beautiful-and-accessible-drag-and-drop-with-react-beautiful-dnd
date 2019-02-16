import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd';
import Handle from './Handle';

const Container = styled.div`
  border: 1px solid lightgray;
  padding: 8px;
  margin-right: 8px;
  border-radius: 2px;
  transition: background 200ms ease;
  background: ${props => (props.isDragging ? 'lightgreen' : 'white')};
  display: flex;
`


export default class Task extends React.Component {
  render() {
    const isDragDisabled = this.props.task.id === 'task-2';

    return <Draggable
      draggableId={this.props.task.id}
      index={this.props.index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Handle
            {...provided.dragHandleProps}
            isDragDisabled={isDragDisabled}
          />
          {this.props.task.content}
        </Container>
      )}
    </Draggable>
  }
}
