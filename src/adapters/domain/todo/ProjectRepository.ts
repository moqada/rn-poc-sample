import { IProjectRepository, Project, ProjectId } from '../../../domain/todo';
import { ReduxProvider } from '../../../lib/redux/ReduxProvider';
import { todoActions, todoSelectors } from './redux/todoSlice';

export class ProjectRepository implements IProjectRepository {
  static create() {
    return new ProjectRepository(ReduxProvider.create());
  }
  constructor(private redux: ReduxProvider) {}
  async save(project: Project): Promise<void> {
    this.redux.dispatch(todoActions.projectSaved(project));
  }

  async saveList(projects: Array<Project>): Promise<void> {
    // TODO
    console.log(projects);
  }

  async getById(id: ProjectId): Promise<Project | null> {
    const state = this.redux.getState();
    return todoSelectors.selectProjectById(state, id);
  }
}
