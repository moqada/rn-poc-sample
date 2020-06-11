import {Entity} from '@domain/lib';
import {Identifier} from '@domain/lib/Identifier';

import {TodoTitle} from './TodoTitle';

export class TodoId extends Identifier<string> {}
export class Todo extends Entity<TodoId> {
  id: TodoId;
  title: TodoTitle;
  checked: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    title,
    checked,
    createdAt,
    updatedAt,
  }: {
    id: TodoId;
    title: TodoTitle;
    checked: boolean;
    createdAt: Date;
    updatedAt: Date;
  }) {
    super();
    this.id = id;
    this.title = title;
    this.checked = checked;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
