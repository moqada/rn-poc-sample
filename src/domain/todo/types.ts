import {Project, ProjectId} from './Project';
import {TodoItem, TodoItemId} from './TodoItem';
import {TodoNote} from './TodoNote';
import {TodoTitle} from './TodoTitle';

export interface ITodoItemRepository {
  save(item: TodoItem): Promise<void>;
  getById(id: TodoItemId): Promise<TodoItem | null>;
  saveList(items: Array<TodoItem>): Promise<void>;
  // filterByWords(words: string): Promise<Array<TodoItem>>;
}
export interface ITodoItemApiGateway {
  getById(id: TodoItemId): Promise<TodoItem>;
  getAll(): Promise<Array<TodoItem>>;
  getListByProjectId(id: ProjectId): Promise<Array<TodoItem>>;
  create(props: {
    title: TodoTitle;
    note?: TodoNote;
    projectId?: ProjectId;
  }): Promise<TodoItem>;
  update(props: {
    title: TodoTitle;
    note?: TodoNote;
    projectId?: ProjectId;
    id: TodoItemId;
  }): Promise<TodoItem>;
}

export interface IProjectRepository {
  save(project: Project): Promise<void>;
  saveList(projects: Array<Project>): Promise<void>;
  getById(id: ProjectId): Promise<Project | null>;
}

export interface IProjectApiGateway {
  getById(id: ProjectId): Promise<Project>;
  getList(): Promise<Array<Project>>;
  create(props: {title: TodoTitle}): Promise<Project>;
  update(props: {id: ProjectId; title: TodoTitle}): Promise<Project>;
}
