import {Entity} from 'domain/lib';
import {Identifier} from 'domain/lib/Identifier';

export class TodoId extends Identifier<string> {}
export class Todo extends Entity<TodoId> {
  id: TodoId;
  checked: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    checked,
    createdAt,
    updatedAt,
  }: {
    id: TodoId;
    checked: boolean;
    createdAt: Date;
    updatedAt: Date;
  }) {
    super();
    this.id = id;
    this.checked = checked;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
