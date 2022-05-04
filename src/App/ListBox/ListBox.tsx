import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemType } from '../ItemTypes';
import { Root } from './ListBox.style';

type Props = {
  id: string;
  children: React.ReactNode;
};

export const ListBox = (props: Props) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: () => ({ name: `${ItemType}_${props.id}` }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  let backgroundColor;
  if (isActive) {
    backgroundColor = '#dddddd';
  } else if (canDrop) {
    backgroundColor = '#eeeeee';
  }

  return (
    <Root ref={drop} style={{ backgroundColor }}>
      {props.children}
    </Root>
  );
};
