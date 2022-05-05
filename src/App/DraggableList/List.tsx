import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Item } from '../types';
import { itemHeight } from '../definitions';
import { ListItem } from '../ListItem/ListItem';
import { ListItemEmpty } from '../ListItem/ListItemEmpty';

type Props = {
  list: Item[];
  onDrop: (itemId: number, index: number, spacer: number) => void;
  spacer: number;
};

const renderSpacerIfNecessarily = (spacer: number) => {
  const style = { height: itemHeight, top: spacer * itemHeight };

  return (
    <CSSTransition key="UNIQUE-KEY" timeout={500} classNames="list-item" unmountOnExit appear>
      <ListItemEmpty style={style} />
    </CSSTransition>
  );
};

const getOrderAccordingToSpacer = (index: number, spacer: number) => {
  if (spacer === -1) {
    return index;
  }

  return index >= spacer ? index + 1 : index;
};

const renderList = (
  list: Item[],
  onDrop: (itemId: number, index: number) => void,
  spacer: number,
) => {
  return list.map((item, index) => {
    const order = getOrderAccordingToSpacer(index, spacer);
    const style = { height: itemHeight, top: order * itemHeight };

    return (
      <CSSTransition key={item.id} timeout={500} classNames="list-item" unmountOnExit appear>
        <ListItem onDrop={onDrop} id={item.id} style={style} index={index}>
          {item.caption}
        </ListItem>
      </CSSTransition>
    );
  });
};

export const List = ({ list, onDrop, spacer }: Props) => {
  const dropHandlerCarrier = useRef(onDrop);
  dropHandlerCarrier.current = onDrop;

  const cachedDropHandler = (itemId: number, index: number) => {
    return dropHandlerCarrier.current(itemId, index, spacer);
  };

  return (
    <>
      {renderList(list, cachedDropHandler, spacer)}
      {renderSpacerIfNecessarily(spacer)}
    </>
  );
};
