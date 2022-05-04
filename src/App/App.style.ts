import styled from 'styled-components';

export const Root = styled.div`
  display: flex;
  flex-direction: row;
  width: 800px;
  margin: 0 auto;
`;

export const Column = styled.div`
  position: relative;
  min-width: 200px;
  flex-basis: 200px;

  & .list-item-exit-active {
    opacity: 0;
  }
`;

export const Spacer = styled.div`
  flex-basis: 400px;
  min-width: 400px;
`;

export const ListBoxInner = styled.div`
  position: relative;
`;
