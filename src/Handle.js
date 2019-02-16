import styled from 'styled-components';
export default styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
  opacity: ${props => (props.isDragDisabled) ? 0.5 : 1};
  cursor: ${props => (props.isDragDisabled) ? 'no-drop' : 'initial'};
`;