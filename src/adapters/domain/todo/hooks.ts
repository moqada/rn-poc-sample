import {ProjectRepository} from './ProjectRepository';
import {ProjectResource} from './ProjectResource';

export const useProject = () => {
  return {
    repository: ProjectRepository.create(),
    resource: ProjectResource.create(),
  };
};
