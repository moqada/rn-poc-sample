import { RenderResult, renderHook } from '@testing-library/react-hooks';
import { useProjectListPage } from '../thinUseCaseHooks';

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: () => jest.fn(),
}));
jest.mock('@react-navigation/core', () => {
  return {
    ...jest.requireActual('@react-navigation/core'),
    useNavigation: () => {
      return { navigate: jest.fn() };
    },
  };
});
jest.mock('../../../../useCases/todo/AddProjectUseCase', () => ({
  AddProjectThinUseCase: {
    create: () => ({
      execute: jest.fn().mockReturnValue({ id: 'hoge' }),
    }),
  },
}));

describe('useProjectListPage', () => {
  let result: RenderResult<ReturnType<typeof useProjectListPage>>;

  beforeEach(() => {
    result = renderHook(() => useProjectListPage()).result;
  });

  it('execute', async () => {
    await result.current.onPressAdd();
  });
});
