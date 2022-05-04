import React, { useRef, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import * as S from './App.style';
import { ListItem } from './ListItem/ListItem';
import { ListBox } from './ListBox/ListBox';
import { ItemType } from './ItemTypes';
import { itemHeight } from './definitions';
import { Item, listSpacerSymbol } from './types';
import { ListItemEmpty } from './ListItem/ListItemEmpty';

const firstList = [
  {
    id: 1,
    caption: 'Колобок',
  },
  {
    id: 2,
    caption: 'Баба Яга',
  },
  {
    id: 3,
    caption: 'Илья Муромец',
  },
  {
    id: 4,
    caption: 'Серый волк',
  },
  {
    id: 5,
    caption: 'Чудовище',
  },
  {
    id: 6,
    caption: 'Пятячек',
  },
] as Item[];

const secondList = [
  {
    id: 7,
    caption: 'Шрек',
  },
  {
    id: 8,
    caption: 'Красная шапочка',
  },
  {
    id: 9,
    caption: 'Щелкунчик',
  },
  {
    id: 10,
    caption: 'Каркуша',
  },
  {
    id: 11,
    caption: 'Лунтик',
  },
] as Item[];

const renderList = (
  list: Item[],
  onDrop: (itemId: number, areaName: string) => void,
  spacer: number | null,
) => {
  const renderListResult = [
    ...list.map((item, index) => {
      const getCulcIndex = (index1: number) => {
        if (spacer === null) {
          return index1;
        }

        return index1 >= spacer ? index1 + 1 : index1;
      };

      const calcIndex = getCulcIndex(index);
      const style = { height: itemHeight, top: calcIndex * itemHeight };

      if (item.id !== listSpacerSymbol) {
        return (
          <CSSTransition key={item.id} timeout={500} classNames="list-item" unmountOnExit appear>
            <ListItem onDrop={onDrop} id={item.id} style={style}>
              {item.caption}
            </ListItem>
          </CSSTransition>
        );
      }

      return null;
    }),
    ...(spacer !== null
      ? [
          (() => {
            const style = { height: itemHeight, top: spacer * itemHeight };
            return (
              <CSSTransition
                key="UNIQUE-KEY"
                timeout={500}
                classNames="list-item"
                unmountOnExit
                appear
              >
                <ListItemEmpty style={style} />
              </CSSTransition>
            );
          })(),
        ]
      : []),
  ];

  return renderListResult;
};

const removeFromList = (list: Item[], item: Item) => {
  const itemIndex = list.indexOf(item);

  list = [...list];
  list.splice(itemIndex, 1);

  return [...list];
};

export const App = () => {
  const [spacer1, setSpacer1] = useState<number | null>(null);
  const [spacer2, setSpacer2] = useState<number | null>(null);
  const [list1, setList1] = useState(firstList);
  const [list2, setList2] = useState(secondList);
  const list1Obj = useRef(list1);
  const list2Obj = useRef(list2);
  const spacer1Obj = useRef(spacer1);
  const spacer2Obj = useRef(spacer2);

  const handleDrop = (itemId: number, areaName: string, listName: string) => {
    const prevList1ObjValue = list1Obj.current;
    const list1Item = list1Obj.current.find((item) => {
      return item.id === itemId;
    });

    const prevList2ObjValue = list2Obj.current;
    const list2Item = list2Obj.current.find((item) => {
      return item.id === itemId;
    });

    if (list1Item) {
      const newList = removeFromList(list1Obj.current, list1Item);
      list1Obj.current = newList;
      setList1(newList);
    }

    if (list2Item) {
      const newList = removeFromList(list2Obj.current, list2Item);
      list2Obj.current = newList;
      setList2(newList);
    }

    const targetItem = list1Item ?? list2Item;
    if (!targetItem) {
      return;
    }

    if (areaName === `${ItemType}_first` && spacer1Obj.current !== null) {
      const nextList = [...list1Obj.current];

      if (`${ItemType}_first` === listName) {
        const targetItemIndex = prevList1ObjValue.indexOf(targetItem);
        nextList.splice(
          spacer1Obj.current > targetItemIndex ? spacer1Obj.current - 1 : spacer1Obj.current,
          0,
          targetItem,
        );
      } else {
        nextList.splice(spacer1Obj.current, 0, targetItem);
      }

      list1Obj.current = nextList;
      setList1(nextList);
    }

    if (areaName === `${ItemType}_second` && spacer2Obj.current !== null) {
      const nextList = [...list2Obj.current];

      if (`${ItemType}_second` === listName) {
        const targetItemIndex = prevList2ObjValue.indexOf(targetItem);
        nextList.splice(
          spacer2Obj.current > targetItemIndex ? spacer2Obj.current - 1 : spacer2Obj.current,
          0,
          targetItem,
        );
      } else {
        nextList.splice(spacer2Obj.current, 0, targetItem);
      }

      list2Obj.current = nextList;
      setList2(nextList);
    }
  };

  const handleDropList1 = (itemId: number, areaName: string) => {
    handleDrop(itemId, areaName, `${ItemType}_first`);
  };

  const handleDropList2 = (itemId: number, areaName: string) => {
    handleDrop(itemId, areaName, `${ItemType}_second`);
  };

  /*
    useEffect(() => {
      const intervalDescriptor = setInterval(() => {
        if (!list1.length) {
          return;
        }

        const random = Math.floor(Math.random() * list1.length);
        setList2([...list2, list1[random] as Item]);

        const nextList1 = list1;
        nextList1.splice(random, 1);
        setList1([...nextList1]);
      }, 3000);

      return () => {
        clearInterval(intervalDescriptor);
      };
    }, [list1, list2]);
   */

  const handleNewSpacerIndexList1 = (index: number | null) => {
    console.log(`1 index: ${String(index)}`);
    if (index !== null) {
      spacer1Obj.current = index;
    }

    setSpacer1(index);
  };

  const handleNewSpacerIndexList2 = (index: number | null) => {
    console.log(`2 index: ${String(index)}`);
    if (index !== null) {
      spacer2Obj.current = index;
    }

    setSpacer2(index);
  };

  return (
    <S.Root>
      <S.Column>
        <ListBox id="first" list={list1} onNewSpacerIndex={handleNewSpacerIndexList1}>
          <S.ListBoxInner
            style={{ height: (list1.length + (spacer1 !== null ? 1 : 0)) * itemHeight }}
          >
            <TransitionGroup component="div">
              {renderList(list1, handleDropList1, spacer1)}
            </TransitionGroup>
          </S.ListBoxInner>
        </ListBox>
      </S.Column>
      <S.Spacer />
      <S.Column>
        <ListBox id="second" list={list2} onNewSpacerIndex={handleNewSpacerIndexList2}>
          <S.ListBoxInner
            style={{ height: (list2.length + (spacer2 !== null ? 1 : 0)) * itemHeight }}
          >
            <TransitionGroup component="div">
              {renderList(list2, handleDropList2, spacer2)}
            </TransitionGroup>
          </S.ListBoxInner>
        </ListBox>
      </S.Column>
    </S.Root>
  );
};
