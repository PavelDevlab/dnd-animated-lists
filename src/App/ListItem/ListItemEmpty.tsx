import React from 'react';

import * as S from './ListItem.style';

type Props = {
  style: { top: number; height: number };
};

export const ListItemEmpty = (props: Props) => {
  return <S.Root style={props.style} />;
};
