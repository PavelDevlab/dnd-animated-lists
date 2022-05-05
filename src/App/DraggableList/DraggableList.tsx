import React, { useContext, useRef, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';

import { itemHeight } from '../definitions';

import { ListBox } from '../ListBox/ListBox';
import * as S from '../App.style';
import { StoreContext } from '../Store/Store';
import { renderList, renderSpacerIfNecessarily } from './List';

type Props = {
  name: 'first' | 'second';
};

export const DraggableList = (props: Props) => {
  const { store, setItem } = useContext(StoreContext);
  const list = store[props.name];
  const [spacer, setSpacer] = useState(-1);

  const handleDrop = (itemId: number, index: number, dropSpacer: number) => {
    setItem(itemId, index, dropSpacer, props.name);
  };

  const handleNewSpacerIndexList = (index: number) => {
    setSpacer(index);
  };

  const height = (list.length + (spacer !== -1 ? 1 : 0)) * itemHeight;
  const dropHandlerCarrier = useRef(handleDrop);
  dropHandlerCarrier.current = handleDrop;

  const cachedDropHandler = (itemId: number, index: number) => {
    return dropHandlerCarrier.current(itemId, index, spacer);
  };

  return (
    <S.Column>
      <ListBox id="second" list={list} onNewSpacerIndex={handleNewSpacerIndexList}>
        <S.ListBoxInner style={{ height }}>
          <TransitionGroup component="div">
            {renderList(list, cachedDropHandler, spacer)}
            {renderSpacerIfNecessarily(spacer)}
          </TransitionGroup>
        </S.ListBoxInner>
      </ListBox>
    </S.Column>
  );
};
