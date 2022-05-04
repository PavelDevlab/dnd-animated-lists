import styled from 'styled-components';

export const Root = styled.div`
  position: absolute;
  width: 100%;
  transition: top ease-in 500ms;
`;

export const ListItem = styled.div<{
  dragging: boolean;
}>`
  display: block;
  padding: 10px;
  box-sizing: border-box;
  border: 2px solid #999999;
  background: #eeeeee;
  ${(props) => (props.dragging ? 'opacity: 0.4;' : '')};
`;
