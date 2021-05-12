import { useRoute } from '@react-navigation/core';
import { RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { todoSelectors } from '../../../adapters/domain/todo/redux/todoSlice';
import { RootState } from '../../../lib/redux/rootReducer';
import { RootParamList } from '../../../navigation/routes';
import { PROJECT_DETAIL } from '../../../navigation/routeNames';

export const useProjectDetailPage = () => {
  const route = useRoute<RouteProp<RootParamList, typeof PROJECT_DETAIL>>();
  const project = useSelector<
    RootState,
    ReturnType<typeof todoSelectors.selectProjectById>
  >((state) => todoSelectors.selectProjectById(state, route.params.id));
  console.log(project, route.params);
  return {
    id: project ? project.id : '',
    title: project ? project.title : 'none',
  };
};
