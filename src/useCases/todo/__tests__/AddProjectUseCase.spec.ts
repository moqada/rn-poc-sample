import {mock, MockProxy} from 'jest-mock-extended';
import {
  IProjectRepository,
  IProjectApiGateway,
  Project,
  TodoTitle,
} from '../../../domain/todo';
import {IIndicator} from '../../../adapters/services/indicator';
import {INavigator} from '../../../adapters/services/navigation';
import {AddProjectUseCase} from '../AddProjectUseCase';

describe('AddProjectUseCase', () => {
  let mockRepo: MockProxy<IProjectRepository>;
  let mockApiGateway: MockProxy<IProjectApiGateway>;
  let mockNav: MockProxy<INavigator>;
  let mockIndicator: MockProxy<IIndicator>;

  beforeEach(() => {
    mockRepo = mock<IProjectRepository>();
    mockApiGateway = mock<IProjectApiGateway>();
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
    mockApiGateway.create.mockResolvedValue(pj);
    const useCase = new AddProjectUseCase(
      mockRepo,
      mockApiGateway,
      mockNav,
      mockIndicator
    );
    const title = TodoTitle.create('hoge');
    await useCase.execute({title});
    expect(mockIndicator.show).toBeCalledWith();
    expect(mockApiGateway.create).toBeCalledWith({title});
    expect(mockRepo.save).toBeCalledWith(pj);
    expect(mockNav.navigate).toBeCalledWith('ProjectDetail', {id: 'hoge'});
    expect(mockIndicator.hide).toBeCalledWith();
  });
});
