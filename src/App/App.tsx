import React, { useEffect, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import * as S from './App.style';
import { ListItem } from './ListItem/ListItem';

interface Item {
  id: number;
  caption: string;
}

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
];

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
];

const renderList = (list: Item[]) => {
  return list.map((item) => {
    return (
      <CSSTransition key={item.id} timeout={300} classNames="list-item" unmountOnExit appear>
        <ListItem>{item.caption}</ListItem>
      </CSSTransition>
    );
  });
};

export const App = () => {
  const [list1, setList1] = useState(firstList);
  const [list2, setList2] = useState(secondList);

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

  return (
    <S.Root>
      <S.Column>
        <TransitionGroup component="div">{renderList(list1)}</TransitionGroup>
      </S.Column>
      <S.Spacer />
      <S.Column>
        <TransitionGroup component="div">{renderList(list2)}</TransitionGroup>
      </S.Column>
    </S.Root>
  );
};
