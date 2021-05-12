import { useNavigation } from '@react-navigation/core';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { todoSelectors } from '../../../adapters/domain/todo/redux/todoSlice';
import { TodoTitle } from '../../../domain/todo';
import { useUseCaseCommander } from '../../../lib/useCase/redux/useUseCaseCommander';
import * as routeNames from '../../../navigation/routeNames';
import { AddProjectFatUseCase } from '../../../useCases/todo/AddProjectUseCase';

export const useProjectListPage = () => {
  const navigation = useNavigation();
  const onPressItem = useCallback((item) => {
    navigation.navigate(routeNames.PROJECT_DETAIL, { id: item.id });
  }, []);
  const items = useSelector(todoSelectors.selectProjectAll);
  const commander = useUseCaseCommander();
  const onPressAdd = useCallback(() => {
    commander.command(AddProjectFatUseCase, {
      title: TodoTitle.create('hoge'),
    });
  }, []);
  return { items, onPressAdd, onPressItem };
};
