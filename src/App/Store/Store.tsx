import React, { useState } from 'react';

import { firstList, secondList } from './data';
import { Item } from '../types';

type SetItemMethod = (itemId: number, spacer: number, name: 'first' | 'second') => void;

const emptySetList: SetItemMethod = () => {};
const emptyList: Item[] = [];

const emptyValue = {
  setItem: emptySetList,
  store: {
    first: emptyList,
    second: emptyList,
  },
};

export const StoreContext = React.createContext(emptyValue);

type Props = {
  children: React.ReactNode;
};

const createInitialState = () => {
  return {
    first: firstList,
    second: secondList,
  };
};

const getOrderAccordingToSpacer = (index: number, spacer: number) => {
  return spacer > index ? spacer - 1 : spacer;
};

export const Store = (props: Props) => {
  const [store, setStore] = useState(createInitialState);
  const setItem = React.useCallback<SetItemMethod>(
    (itemId, spacer, listName) => {
      const listIndex = {
        first: store.first.findIndex((item) => {
          return item.id === itemId;
        }),
        second: store.second.findIndex((item) => {
          return item.id === itemId;
        }),
      };

      const targetItem = store.first[listIndex.first] ?? store.second[listIndex.second];
      if (!targetItem) {
        return;
      }

      const isTheSameList = listIndex[listName] !== -1;
      let nextStore = {
        ...store,
      };

      let droppedItemIndex = -1;
      (Object.keys(listIndex) as Array<'first' | 'second'>).forEach((name) => {
        if (listIndex[name] === -1) {
          return;
        }

        nextStore[name] = [...nextStore[name]];
        nextStore[name].splice(listIndex[name], 1);
        droppedItemIndex = listIndex[name];
      });

      const order = isTheSameList ? getOrderAccordingToSpacer(droppedItemIndex, spacer) : spacer;
      const list = [...nextStore[listName]];
      list.splice(order, 0, targetItem);

      nextStore = {
        ...nextStore,
        [listName]: list,
      };

      setStore(nextStore);
    },
    [store],
  );

  const value = React.useMemo(() => {
    return {
      store,
      setItem,
    };
  }, [store, setItem]);

  return <StoreContext.Provider value={value}>{props.children}</StoreContext.Provider>;
};
