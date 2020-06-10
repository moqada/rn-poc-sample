import {AccessToken} from './AccessToken';

import {Password, Username} from '../account';

export interface IAuthService {
  login(params: {password: Password; username: Username}): Promise<AccessToken>;
  logout(params: {accessToken: AccessToken}): Promise<void>;
}
