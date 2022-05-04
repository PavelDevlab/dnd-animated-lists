import React, { DragEventHandler } from 'react';
import { useDrop } from 'react-dnd';

import { ItemType } from '../ItemTypes';
import { Root } from './ListBox.style';
import { itemHeight } from '../definitions';
import { Item } from '../types';

type Props = {
  id: string;
  children: React.ReactNode;
  list: Item[];
  onNewSpacerIndex: (index: number | null) => void;
};

export const ListBox = (props: Props) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: () => {
      props.onNewSpacerIndex(null);

      return { name: `${ItemType}_${props.id}` };
    },
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

  const handleDragOver = (...args: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unused-vars
    const { clientX } = args[0];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    // console.log('args[0].clientY: ', args[0].clientY);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    const { clientY } = args[0];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unused-vars
    const currentTarget = args[0].currentTarget as HTMLElement;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // const drop1 = drop as any;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (currentTarget) {
      const clientRect = currentTarget.getBoundingClientRect();
      // const x = clientX - clientRect.left;
      const y = clientY - clientRect.top;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      if (y >= 0 && y <= props.list.length * (itemHeight + 1) + 5) {
        const listY = y - 5;
        const index = Math.floor(listY / (itemHeight + 1));
        const resultIndex = Math.min(Math.max(index, 0), props.list.length);

        props.onNewSpacerIndex(resultIndex);
      }
    }
  };
  /*
    const handleDrag = (...args: any) => {
      console.log('drag: ', props.id, args);
    };

     onDrag={handleDrag}
   */

  const handleDragLeave: DragEventHandler<HTMLDivElement> = (event) => {
    if (event.currentTarget === event.target) {
      props.onNewSpacerIndex(null);
    }
  };

  return (
    <Root
      ref={drop}
      style={{ backgroundColor }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {props.children}
    </Root>
  );
};
