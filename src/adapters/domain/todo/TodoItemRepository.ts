import {
  ITodoItemRepository,
  TodoItem,
  TodoItemId,
} from '../../../domain/todo';
import { ReduxProvider } from '../../../lib/redux/ReduxProvider';
import { todoActions, todoSelectors } from './redux/todoSlice';

export class TodoItemRepository implements ITodoItemRepository {
  constructor(private redux: ReduxProvider) {}
  async save(item: TodoItem): Promise<void> {
    this.redux.dispatch(todoActions.itemSaved(item));
  }
  async getById(id: TodoItemId): Promise<TodoItem | null> {
    const state = this.redux.getState();
    return todoSelectors.selectItemById(state, id);
  }

  async saveList(items: Array<TodoItem>) {
    // TODO
    console.log(items);
  }
}
