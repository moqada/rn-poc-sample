import {createProjectRepository} from '../../adapters/domain/todo/ProjectRepository';
import {createProjectApiGateway} from '../../adapters/domain/todo/ProjectApiGateway';
import {IIndicator, Indicator} from '../../adapters/services/indicator';
import {INavigator, Navigator} from '../../adapters/services/navigation';
import {
  IProjectRepository,
  IProjectApiGateway,
  TodoTitle,
} from '../../domain/todo';
import {UseCase} from '../../lib/useCase';
import * as routeNames from '../../navigation/routeNames';

type Arg = {title: TodoTitle};
export class AddProjectUseCase extends UseCase<Arg> {
  static create() {
    return new AddProjectUseCase(
      createProjectRepository(),
      createProjectApiGateway(),
      Navigator.create(),
      Indicator
    );
  }
  constructor(
    private projectRepository: IProjectRepository,
    private projectResource: IProjectApiGateway,
    private navigator: INavigator,
    private indicator: IIndicator
  ) {
    super();
  }

  async execute(arg: Arg) {
    this.indicator.show();
    const project = await this.projectResource.create({title: arg.title});
    await this.projectRepository.save(project);
    this.indicator.hide();
    this.navigator.navigate(routeNames.PROJECT_DETAIL, {id: project.id});
  }
}
