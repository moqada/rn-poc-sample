import { TodoTitle } from './TodoTitle';

// TODO: いちいち ID と同時に定義して export するのめんどい…
export type ProjectId = string & {
  readonly brand: unique symbol;
};
export const ProjectId = {
  create: (val: string): ProjectId => val as ProjectId,
};
export type Project = {
  title: TodoTitle;
  createdAt: Date;
  updatedAt: Date;
  id: ProjectId;
};

// 親子関係にあるやつってどうやってモデリングするんだろ…
export const Project = {
  create: ({
    createdAt,
    id,
    title,
    updatedAt,
  }: {
    id: string;
    title: string;
    // ここだけ primitive じゃないのへんじゃない…?
    // items: Array<TodoItem>;
    createdAt: Date;
    updatedAt: Date;
  }): Project => {
    return {
      createdAt,
      id: ProjectId.create(id),
      title: TodoTitle.create(title),
      updatedAt,
    };
  },
};
