import {ExpirationDate} from './ExpirationDate';

import {Entity} from '../lib/Entity';
import {Identifier} from '../lib/Identifier';

export class AccessTokenId extends Identifier<string> {}

export class AccessToken extends Entity<AccessTokenId> {
  readonly expiresAt: ExpirationDate;
  readonly id: AccessTokenId;

  constructor(props: {expiresAt: ExpirationDate; id: AccessTokenId}) {
    super();
    this.expiresAt = props.expiresAt;
    this.id = props.id;
  }

  isAvailable({date}: {date: Date}) {
    return !this.expiresAt.isExpired(date);
  }
}
