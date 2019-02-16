import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  border: 1px solid lightgray;
  padding: 8px;
  margin: 8px;
  border-radius: 2px;
`


export default class Task extends React.Component {
  render() {
    return <Container>{this.props.task.content}</Container>
  }
}
