import styled from 'styled-components';

export const Root = styled.div``;

export const ListItem = styled.div<{
  dragging: boolean;
}>`
  display: block;
  height: 40px;
  padding: 10px;
  box-sizing: border-box;
  border: 2px solid #999999;
  background: #eeeeee;
  ${(props) => (props.dragging ? 'opacity: 0.4;' : '')};
`;
