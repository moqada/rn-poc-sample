export type TodoTitle = string & {
  readonly brand: unique symbol;
};
export const TodoTitle = {
  create: (val: string): TodoTitle => val as TodoTitle,
};
