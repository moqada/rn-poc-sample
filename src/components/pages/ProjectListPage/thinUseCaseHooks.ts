import { useNavigation } from '@react-navigation/core';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { todoSelectors } from '../../../adapters/domain/todo/redux/todoSlice';
import { useIndicator } from '../../../adapters/services/indicator/useIndicator';
import { TodoTitle } from '../../../domain/todo';
import * as routeNames from '../../../navigation/routeNames';
import { AddProjectThinUseCase } from '../../../useCases/todo/AddProjectUseCase';
import { ProjectListPage } from './View';

export const useProjectListPage = (): React.ComponentProps<
  typeof ProjectListPage
> => {
  const navigation = useNavigation();
  const onPressItem = useCallback((item) => {
    navigation.navigate(routeNames.PROJECT_DETAIL, { id: item.id });
  }, []);
  const items = useSelector(todoSelectors.selectProjectAll);
  const indicator = useIndicator();
  const onPressAdd = useCallback(async () => {
    indicator.show();
    const project = await AddProjectThinUseCase.create().execute({
      title: TodoTitle.create('hoge'),
    });
    indicator.hide();
    navigation.navigate(routeNames.PROJECT_DETAIL, { id: project.id });
  }, []);
  return { items, onPressAdd, onPressItem };
};
