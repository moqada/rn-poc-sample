import {useProjectListPage} from './hooks';
import {ProjectListPage as View} from './View';

export const ProjectListPage = () => {
  const props = useProjectListPage();
  return View(props);
};
