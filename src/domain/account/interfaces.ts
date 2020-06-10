import {Password} from './Password';
import {PhoneNumber} from './PhoneNumber';
import {User} from './User';
import {Username} from './Username';

import {AccessToken} from '../auth';

export interface AccountRegisterService {
  signUp(params: {
    username: Username;
    phoneNumber: PhoneNumber;
    password: Password;
  }): Promise<{user: User; accessToken: AccessToken}>;
}

export interface UserResource {
  get(): Promise<User>;
}
