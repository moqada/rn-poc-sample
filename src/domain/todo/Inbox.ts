import { TodoItem } from './TodoItem';

// TODO: 概念はあれども model 化する意味ある?
export type Inbox = {
  items: Array<TodoItem>;
};

export const Inbox = {
  create: ({ items }: { items: Array<TodoItem> }): Inbox => {
    return { items };
  },
};
