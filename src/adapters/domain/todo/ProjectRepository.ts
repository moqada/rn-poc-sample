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

export const createProjectRepository = (): IProjectRepository => {
  // TODO
  const { dispatch, getState } = ReduxProvider.create();
  return {
    getById: async (id) => todoSelectors.selectProjectById(getState(), id),
    save: async (project: Project) =>
      dispatch(todoActions.projectSaved(project)),
    saveList: async (projects: Project[]) => console.log('TODO', projects),
  };
};
