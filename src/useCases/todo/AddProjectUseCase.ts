import { ProjectRepository } from '../../adapters/domain/todo/ProjectRepository';
import { ProjectResource } from '../../adapters/domain/todo/ProjectResource';
import { Indicator } from '../../adapters/services/indicator/Indicator';
import { Navigator } from '../../adapters/services/navigation/Navigator';
import {
  IProjectRepository,
  IProjectResource,
  Project,
  TodoTitle,
} from '../../domain/todo';
import { UseCase } from '../../lib/useCase';
import * as routeNames from '../../navigation/routeNames';
import { IIndicator } from '../../services/indicator';
import { INavigator } from '../../services/navigation';

type Arg = { title: TodoTitle };
export class AddProjectFatUseCase extends UseCase<Arg> {
  static create() {
    return new AddProjectFatUseCase(
      ProjectRepository.create(),
      ProjectResource.create(),
      Navigator.create(),
      Indicator
    );
  }
  constructor(
    private projectRepository: IProjectRepository,
    private projectResource: IProjectResource,
    private navigator: INavigator,
    private indicator: IIndicator
  ) {
    super();
  }

  async execute(arg: Arg) {
    this.indicator.show();
    const project = await this.projectResource.create({ title: arg.title });
    await this.projectRepository.save(project);
    this.indicator.hide();
    this.navigator.navigate(routeNames.PROJECT_DETAIL, { id: project.id });
  }
}

export class AddProjectThinUseCase extends UseCase<Arg, Project> {
  static create() {
    return new AddProjectThinUseCase(
      ProjectRepository.create(),
      ProjectResource.create()
    );
  }
  constructor(
    private projectRepository: IProjectRepository,
    private projectResource: IProjectResource
  ) {
    super();
  }

  async execute(arg: Arg) {
    const project = await this.projectResource.create({ title: arg.title });
    await this.projectRepository.save(project);
    return project;
  }
}
