import {UseCase} from './UseCase';
export type UseCaseCommand<CommandArgs> = {
  id: string;
  useCase: UseCase<CommandArgs, any>;
  args: CommandArgs;
};
