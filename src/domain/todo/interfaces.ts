import {Todo, TodoId} from './Todo';
import {TodoTitle} from './TodoTitle';

export interface TodoResource {
  getAll(): Promise<Array<Todo>>;
  getById(id: TodoId): Promise<Todo>;
  removeById(id: TodoId): Promise<void>;
  add(_: {title: TodoTitle; checked: boolean}): Promise<Todo>;
  update(_: {title: TodoTitle; checked: boolean}): Promise<Todo>;
}
