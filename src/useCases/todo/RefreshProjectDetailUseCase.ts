import {
  IProjectRepository,
  IProjectResource,
  ITodoItemRepository,
  ITodoItemResource,
  ProjectId,
} from '../../domain/todo';

export class RefreshProjectDetailUseCase {
  constructor(
    private todoItemResource: ITodoItemResource,
    private projectRepository: IProjectRepository,
    private todoItemRepository: ITodoItemRepository,
    private projectResource: IProjectResource
  ) {}
  async execute({ projectId }: { projectId: ProjectId }): Promise<void> {
    const items = await this.todoItemResource.getListByProjectId(projectId);
    const project = await this.projectResource.getById(projectId);
    await this.projectRepository.save(project);
    await this.todoItemRepository.saveList(items);
  }
}
