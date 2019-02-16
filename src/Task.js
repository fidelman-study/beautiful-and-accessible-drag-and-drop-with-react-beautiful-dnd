import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd';
import Handle from './Handle';

const Container = styled.div`
  border: 1px solid lightgray;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  transition: background 200ms ease;
  background: ${props => (props.isDragging ? 'lightgreen' : 'white')};
  display: flex;
`


export default class Task extends React.Component {
  render() {
    return <Draggable
      draggableId={this.props.task.id}
      index={this.props.index}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Handle {...provided.dragHandleProps} />
          {this.props.task.content}
        </Container>
      )}
    </Draggable>
  }
}
