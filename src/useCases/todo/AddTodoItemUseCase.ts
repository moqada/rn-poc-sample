import {
  ITodoItemRepository,
  ITodoItemResource,
  TodoTitle,
} from '../../domain/todo';
import { UseCase } from '../../lib/useCase';

type Arg = { title: string };
export class AddTodoItemUseCase extends UseCase<Arg> {
  constructor(
    private todoItemResource: ITodoItemResource,
    private todoItemRepository: ITodoItemRepository
  ) {
    super();
  }
  async execute({ title }: { title: TodoTitle }): Promise<void> {
    const item = await this.todoItemResource.create({ title });
    await this.todoItemRepository.save(item);
  }
}
