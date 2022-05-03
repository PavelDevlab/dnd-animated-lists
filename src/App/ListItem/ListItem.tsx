import React from 'react';

import * as S from './ListItem.style';

type Props = {
  children?: React.ReactNode;
};

export const ListItem = (props: Props) => {
  return <S.ListItem>{props.children}</S.ListItem>;
};
