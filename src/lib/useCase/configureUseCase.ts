import { UseCaseCommander } from './UseCaseCommander';
import { UseCaseExecutor } from './UseCaseExecutor';

export const configureUseCase = () => {
  const useCaseExecutor = new UseCaseExecutor();
  const useCaseCommander = new UseCaseCommander(useCaseExecutor);
  return { useCaseCommander, useCaseExecutor };
};
