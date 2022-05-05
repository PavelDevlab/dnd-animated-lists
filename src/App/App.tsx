import React from 'react';

import * as S from './App.style';
import { Store } from './Store/Store';
import { DraggableList } from './DraggableList/DraggableList';

export const App = () => {
  return (
    <Store>
      <S.Root>
        <DraggableList name="first" />
        <S.Spacer />
        <DraggableList name="second" />
      </S.Root>
    </Store>
  );
};
