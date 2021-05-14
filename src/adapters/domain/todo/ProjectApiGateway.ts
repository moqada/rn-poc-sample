import {
  Project,
  IProjectApiGateway,
  TodoTitle,
  ProjectId,
} from '../../../domain/todo';

const RECORDS: {[key: string]: Project} = {
  inbox: Project.create({
    createdAt: new Date(),
    id: 'inbox',
    title: 'Inbox',
    updatedAt: new Date(),
  }),
};
const response = <R>(res: R): Promise<R> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(res), 1000);
  });

export const createProjectApiGateway = (): IProjectApiGateway => {
  return {
    async getById(id: ProjectId): Promise<Project> {
      const item = RECORDS[id];
      if (item) {
        return response(item);
      }
      throw new Error('Not Found');
    },

    getList: (): Promise<Array<Project>> => {
      const items = Object.values(RECORDS).sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
      );
      return response(items);
    },

    create: ({title}: {title: TodoTitle}): Promise<Project> => {
      const now = new Date();
      const item = Project.create({
        createdAt: now,
        id: now.getTime().toString(),
        title,
        updatedAt: now,
      });
      RECORDS[item.id] = item;
      return response(item);
    },

    update: ({
      id,
      title,
    }: {
      id: ProjectId;
      title: TodoTitle;
    }): Promise<Project> => {
      const item = RECORDS[id];
      if (!item) {
        throw new Error('Not Found');
      }
      const updated = {...item, title, updatedAt: new Date()};
      RECORDS[id] = updated;
      return response(updated);
    },
  };
};
