import { IProjectRepository, IProjectResource } from '../../domain/todo';

export class RefreshProjectListUseCase {
  constructor(
    private projectResouce: IProjectResource,
    private projectRepository: IProjectRepository
  ) {}
  async execute() {
    const projects = await this.projectResouce.getList();
    await this.projectRepository.saveList(projects);
  }
}
