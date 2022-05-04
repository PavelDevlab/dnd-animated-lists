export const listSpacerSymbol = Symbol('LIST SPACER');

export interface Item {
  id: number | typeof listSpacerSymbol;
  caption: string;
}
