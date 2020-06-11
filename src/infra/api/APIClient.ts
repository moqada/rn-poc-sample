/* eslint-disable @typescript-eslint/no-unused-vars */
type Response<T> = {
  data: T;
  status: number;
};

export type AccessTokenResource = {
  createdAt: string;
  token: string;
  expiresIn: number;
};
export type UserResource = {
  id: string;
  username: string;
  phoneNumber: string;
  birthday: string;
};
type LoginRequest = {username: string; password: string};
type LogoutRequest = {token: string};
type SignUpRequest = {
  username: string;
  password: string;
  phoneNumber: string;
  birthday: string;
};
export type TodoResource = {
  id: string;
  title: string;
  checked: boolean;
  updatedAt: string;
  createdAt: string;
};

const DUMMY_USER = {
  id: 'x',
  username: 'moqada',
  phoneNumber: '09000000000',
  birthday: '2000-01-02',
};
const DUMMY_TODOS = [];
for (let i = 0; i < 1000; i++) {
  DUMMY_TODOS.push({
    id: `a-${i}`,
    title: `おこめたべる ${i}`,
    checked: false,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  });
}

const createAccessToken = (): AccessTokenResource => {
  const createdAt = new Date();
  return {
    token: `DUMMY_TOKEN-${createdAt.getTime()}`,
    expiresIn: 3600,
    createdAt: createdAt.toISOString(),
  };
};

const createTodo = ({
  title,
  checked,
}: {
  title: string;
  checked: boolean;
}): TodoResource => {
  const createdAt = new Date();
  return {
    title,
    checked,
    id: createdAt.getTime().toString(),
    createdAt: createdAt.toISOString(),
    updatedAt: createdAt.toISOString(),
  };
};

const delay = async (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
};
const response = async <T>({
  data,
  delayTime = 1000,
}: {
  data: T;
  delayTime?: number;
}): Promise<Response<T>> => {
  await delay(delayTime);
  return {
    data,
    status: 200,
  };
};
const createErrorResponse = <T>({
  data,
  status,
  delayTime = 1000,
}: {
  data: T;
  status: number;
  delayTime?: number;
}): {response: {data: T; status: number}} => {
  return {
    response: {
      data,
      status,
    },
  };
};

export class APIClient {
  token: string | undefined;

  constructor({token}: {token?: string}) {
    this.token = token;
  }

  /**
   * Login
   *
   * @param params - Params
   */
  async login(params: LoginRequest): Promise<Response<AccessTokenResource>> {
    if (params.username !== DUMMY_USER.username) {
      await delay(2000);
      throw createErrorResponse({
        data: {type: 'oauth_error', code: 'invalid_grant'},
        status: 400,
      });
    }
    return response({data: createAccessToken()});
  }

  /**
   * Logout
   *
   * @param params - Params
   */
  async logout(params: LogoutRequest): Promise<Response<void>> {
    return response({data: undefined});
  }

  /**
   * SignUp
   *
   * @param params - Params
   */
  async SignUp(
    params: SignUpRequest
  ): Promise<Response<{user: UserResource; accessToken: AccessTokenResource}>> {
    return response({
      data: {user: DUMMY_USER, accessToken: createAccessToken()},
    });
  }

  /**
   * userSelf
   */
  async userSelf(): Promise<Response<UserResource>> {
    return response({
      data: DUMMY_USER,
    });
  }

  async todoSelf(id: string): Promise<Response<TodoResource>> {
    const todo = DUMMY_TODOS.find((item) => item.id === id);
    if (!todo) {
      await delay(2000);
      throw createErrorResponse({data: {type: 'not_found'}, status: 404});
    }
    return response({data: {...todo}});
  }

  async todoInstances(): Promise<Response<Array<TodoResource>>> {
    // DUMMY_TODOS.push(
    //   createTodo({title: `sample+${new Date().getTime()}`, checked: false})
    // );
    return response({data: DUMMY_TODOS.map((item) => ({...item}))});
  }

  async todoCreate({
    title,
    checked,
  }: {
    title: string;
    checked: boolean;
  }): Promise<Response<TodoResource>> {
    const todo = createTodo({title, checked});
    DUMMY_TODOS.push(todo);
    return response({data: todo});
  }

  async todoUpdate(
    id: string,
    {
      title,
      checked,
    }: {
      title: string;
      checked: boolean;
    }
  ): Promise<Response<TodoResource>> {
    const updatedAt = new Date();
    const todo = DUMMY_TODOS.find((todo) => todo.id === id);
    if (!todo) {
      await delay(2000);
      throw createErrorResponse({data: {type: 'not_found'}, status: 404});
    }
    const index = DUMMY_TODOS.findIndex((todo) => todo.id === id);
    const newTodo = {
      ...todo,
      title,
      checked,
      updatedAt: updatedAt.toISOString(),
    };
    DUMMY_TODOS.splice(index, 1, newTodo);
    return response({data: newTodo});
  }
}
