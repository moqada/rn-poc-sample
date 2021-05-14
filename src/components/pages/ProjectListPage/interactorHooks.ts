import {useNavigation} from '@react-navigation/core';
import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {useProject} from '../../../adapters/domain/todo/hooks';
import {todoSelectors} from '../../../adapters/domain/todo/redux/todoSlice';
import {useIndicator} from '../../../adapters/services/indicator/useIndicator';
import {
  IProjectRepository,
  IProjectResource,
  TodoTitle,
} from '../../../domain/todo';
import {UseCase} from '../../../lib/useCase';
import * as routeNames from '../../../navigation/routeNames';
import {IIndicator} from '../../../services/indicator';
import {INavigator} from '../../../services/navigation';
import {ProjectListPage} from './View';

type Arg = {title: TodoTitle};
class AddProjectUseCase extends UseCase<Arg> {
  constructor(
    private projectRepository: IProjectRepository,
    private projectResource: IProjectResource,
    private navigator: INavigator,
    private indicator: IIndicator
  ) {
    super();
  }

  async execute(arg: Arg) {
    this.indicator.show();
    const project = await this.projectResource.create({title: arg.title});
    await this.projectRepository.save(project);
    this.indicator.hide();
    this.navigator.navigate(routeNames.PROJECT_DETAIL, {id: project.id});
  }
}

const useAddProjectUseCase = () => {
  const navigator = useNavigation();
  const {repository: projectRepo, resource: projectResource} = useProject();
  const indicator = useIndicator();
  return new AddProjectUseCase(
    projectRepo,
    projectResource,
    navigator,
    indicator
  );
};

const useAddProjectUseCase = () => {
  const navigator = useNavigation();
  const {repository: projectRepo, resource: projectResource} = useProject();
  const indicator = useIndicator();
  return async ({title}: {title: TodoTitle}) => {
    indicator.show();
    const project = await projectResource.create({title});
    await projectRepo.save(project);
    indicator.hide();
    navigator.navigate(routeNames.PROJECT_DETAIL, {id: project.id});
  };
};

// onError のときの共通処理などが書きづらい
const addProjectUseCaseFactory = (ctx: {
  projectRepo: IProjectRepository;
  projectResource: IProjectResource;
  indicator: IIndicator;
  navigator: INavigator;
}) => {
  return async (arg: {title: TodoTitle}) => {
    ctx.indicator.show();
    const project = await ctx.projectResource.create({title: arg.title});
    await ctx.projectRepo.save(project);
    ctx.indicator.hide();
    ctx.navigator.navigate(routeNames.PROJECT_DETAIL, {id: project.id});
  };
};

export const useProjectListPage = (): React.ComponentProps<
  typeof ProjectListPage
> => {
  const navigation = useNavigation();
  const onPressItem = useCallback((item) => {
    navigation.navigate(routeNames.PROJECT_DETAIL, {id: item.id});
  }, []);
  const items = useSelector(todoSelectors.selectProjectAll);
  const useCase = useAddProjectUseCase();
  const onPressAdd = useCallback(async () => {
    command({title: TodoTitle.create('hoge')});
  }, []);
  return {items, onPressAdd, onPressItem};
};
