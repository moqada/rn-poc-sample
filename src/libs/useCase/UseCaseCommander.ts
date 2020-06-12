import {UseCase} from './UseCase';
import {UseCaseExecutor} from './UseCaseExecutor';

interface UseCaseFactory<Args> {
  create(): UseCase<Args, any>;
}

export class UseCaseCommander {
  constructor(readonly executor: UseCaseExecutor) {}
  command<Args>(useCaseFactory: UseCaseFactory<Args>, args: Args) {
    const useCase = useCaseFactory.create();
    this.executor.execute({useCase, args, id: Date.now().toString()});
  }
}
