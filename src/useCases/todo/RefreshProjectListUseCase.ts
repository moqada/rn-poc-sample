import {IProjectRepository, IProjectApiGateway} from '../../domain/todo';

export class RefreshProjectListUseCase {
  constructor(
    private projectResouce: IProjectApiGateway,
    private projectRepository: IProjectRepository
  ) {}
  async execute() {
    const projects = await this.projectResouce.getList();
    await this.projectRepository.saveList(projects);
  }
}
