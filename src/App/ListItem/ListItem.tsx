import React from 'react';
import { useDrag } from 'react-dnd';

import * as S from './ListItem.style';
import { ItemType } from '../ItemTypes';

type Props = {
  id: number;
  children?: React.ReactNode;
  style: { top: number; height: number };
};

export const ListItem = (props: Props) => {
  const [{ isDragging }, drag] = useDrag<{ id: number }, { name: string }, { isDragging: boolean }>(
    () => ({
      type: ItemType,
      item: { id: props.id },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          console.log(`You dropped ${item.id} into ${dropResult.name}!`);
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
  );

  return (
    <S.Root style={props.style}>
      <S.ListItem ref={drag} dragging={isDragging}>
        {props.children}
      </S.ListItem>
    </S.Root>
  );
};
