import { useProjectListPage } from './thinUseCaseHooks';
// import { useProjectListPage } from './fatUseCaseHooks';
import { ProjectListPage as View } from './View';

export const ProjectListPage = () => {
  const props = useProjectListPage();
  return View(props);
};
