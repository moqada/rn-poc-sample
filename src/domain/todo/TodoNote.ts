// export const rules = [maxLength(80)]
export type TodoNote = string & {
  readonly brand: unique symbol;
};
export const TodoNote = {
  create: (val: string): TodoNote => val as TodoNote,
};
