import {Entity, Identifier} from '@libs/domain';

import {PhoneNumber} from './PhoneNumber';
import {Username} from './Username';

export class UserId extends Identifier<string> {}
export class User extends Entity<UserId> {
  readonly id: UserId;
  readonly username: Username;
  readonly phoneNumber: PhoneNumber;

  constructor({
    id,
    username,
    phoneNumber,
  }: {
    id: UserId;
    username: Username;
    phoneNumber: PhoneNumber;
  }) {
    super();
    this.id = id;
    this.username = username;
    this.phoneNumber = phoneNumber;
  }
}
