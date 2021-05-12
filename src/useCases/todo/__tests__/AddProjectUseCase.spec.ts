import { mock, MockProxy } from 'jest-mock-extended';
import {
  IProjectRepository,
  IProjectResource,
  Project,
  TodoTitle,
} from '../../../domain/todo';
import { IIndicator } from '../../../services/indicator';
import { INavigator } from '../../../services/navigation';
import { AddProjectFatUseCase as AddProjectUseCase } from '../AddProjectUseCase';

describe('AddProjectUseCase', () => {
  let mockRepo: MockProxy<IProjectRepository>;
  let mockRes: MockProxy<IProjectResource>;
  let mockNav: MockProxy<INavigator>;
  let mockIndicator: MockProxy<IIndicator>;

  beforeEach(() => {
    mockRepo = mock<IProjectRepository>();
    mockRes = mock<IProjectResource>();
    mockNav = mock<INavigator>();
    mockIndicator = mock<IIndicator>();
  });

  it('execute', async () => {
    const pj = Project.create({
      createdAt: new Date(),
      id: 'hoge',
      title: 'hoge',
      updatedAt: new Date(),
    });
    mockRes.create.mockResolvedValue(pj);
    const useCase = new AddProjectUseCase(
      mockRepo,
      mockRes,
      mockNav,
      mockIndicator
    );
    const title = TodoTitle.create('hoge');
    await useCase.execute({ title });
    expect(mockIndicator.show).toBeCalledWith();
    expect(mockRes.create).toBeCalledWith({ title });
    expect(mockRepo.save).toBeCalledWith(pj);
    expect(mockNav.navigate).toBeCalledWith('ProjectDetail', { id: 'hoge' });
    expect(mockIndicator.hide).toBeCalledWith();
  });
});
