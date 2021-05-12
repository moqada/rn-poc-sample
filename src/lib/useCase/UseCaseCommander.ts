import { UseCaseFactory, UseCase, UseCaseType, UseCaseArg } from './UseCase';
import { UseCaseExecutor } from './UseCaseExecutor';

type CommandParameter<T extends UseCase<any, any>> = UseCaseArg<T> extends void
  ? []
  : [UseCaseArg<T>];

type CommandId = string;

/**
 * UseCase commander
 */
export class UseCaseCommander {
  constructor(readonly executor: UseCaseExecutor) {}
  /**
   * command useCaseCommand
   *
   * @param useCaseFactory - factory class of useCase
   * @param useCaseArgs - useCase arguments
   */
  command<T extends UseCaseFactory<any>>(
    useCaseFactory: T,
    ...args: CommandParameter<UseCaseType<T>>
  ): CommandId {
    // TODO: replace uuid?
    const id = Date.now().toString();
    const [useCaseArgs] = args;
    const useCase = useCaseFactory.create();
    this.executor.execute({ args: useCaseArgs, id, useCase });
    return id;
  }
}
