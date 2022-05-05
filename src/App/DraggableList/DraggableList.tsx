import React, { useContext, useRef, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';

import { itemHeight } from '../definitions';

import { ListBox } from '../ListBox/ListBox';
import * as S from '../App.style';
import { StoreContext } from '../Store/Store';
import { renderList, renderSpacerIfNecessarily } from './List';
import { Item } from '../types';

type Props = {
  name: 'first' | 'second';
};

export const DraggableList = (props: Props) => {
  const { store, setItem } = useContext(StoreContext);
  const list = store[props.name];
  const [spacer, setSpacer] = useState(-1);
  const [lastSpacer, setLastSpacer] = useState(spacer);

  const handleDrop = (itemId: number) => {
    setItem(itemId, lastSpacer, props.name);
  };

  const handleNewSpacerIndexList = (index: number) => {
    if (index !== -1) {
      setLastSpacer(index);
    }

    setSpacer(index);
  };

  const height = (list.length + (spacer !== -1 ? 1 : 0)) * itemHeight;
  const dropHandlerCarrier = useRef(handleDrop);
  dropHandlerCarrier.current = handleDrop;

  const cachedDropHandler = (item: Item) => {
    return dropHandlerCarrier.current(item.id);
  };

  return (
    <S.Column>
      <ListBox
        onDrop={cachedDropHandler}
        id="second"
        list={list}
        onNewSpacerIndex={handleNewSpacerIndexList}
      >
        <S.ListBoxInner style={{ height }}>
          <TransitionGroup component="div">
            {renderList(list, spacer)}
            {renderSpacerIfNecessarily(spacer)}
          </TransitionGroup>
        </S.ListBoxInner>
      </ListBox>
    </S.Column>
  );
};
