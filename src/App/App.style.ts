import styled from 'styled-components';

export const Root = styled.div`
  display: flex;
  flex-direction: row;
  width: 800px;
  margin: 0 auto;
`;

export const Column = styled.div`
  min-width: 200px;
  flex-basis: 200px;

  & .list-item-enter {
    opacity: 0;
  }

  & .list-item-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }

  & .list-item-exit {
    opacity: 1;
  }

  & .list-item-exit-active {
    opacity: 0;
    transition: opacity 500ms ease-in;
  }
`;

export const Spacer = styled.div`
  flex-basis: 400px;
  min-width: 400px;
`;
