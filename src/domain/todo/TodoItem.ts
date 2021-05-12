import { ProjectId } from './Project';
import { TodoNote } from './TodoNote';
import { TodoTitle } from './TodoTitle';

export type TodoItemId = string & {
  readonly brand: unique symbol;
};
export const TodoItemId = {
  create: (val: string): TodoItemId => val as TodoItemId,
};

export type TodoItem = {
  id: TodoItemId;
  title: TodoTitle;
  projectId: ProjectId | null;
  note: TodoNote;
  createdAt: Date;
  updatedAt: Date;
};
export const TodoItem = {
  create: ({
    createdAt,
    id,
    note,
    projectId,
    title,
    updatedAt,
  }: {
    id: string;
    title: string;
    projectId?: ProjectId;
    note: string;
    createdAt: Date;
    updatedAt: Date;
  }): TodoItem => {
    return {
      createdAt,
      id: TodoItemId.create(id),
      note: TodoNote.create(note),
      projectId: projectId || null,
      title: TodoTitle.create(title),
      updatedAt,
    };
  },
};
