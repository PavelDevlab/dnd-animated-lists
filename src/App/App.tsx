import React, { useState } from 'react';

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
    return <ListItem key={item.id}>{item.caption}</ListItem>;
  });
};

export const App = () => {
  const [list1] = useState(firstList);
  const [list2] = useState(secondList);

  return (
    <S.Root>
      <S.Column>{renderList(list1)}</S.Column>
      <S.Spacer />
      <S.Column>{renderList(list2)}</S.Column>
    </S.Root>
  );
};
