import {Entity} from '../lib/Entity';
import {Identifier} from '../lib/Identifier';

export class AccessTokenId extends Identifier<string> {}

export class AccessToken extends Entity<AccessTokenId> {
  readonly expiresIn: number;
  readonly createdAt: Date;
  readonly id: AccessTokenId;

  constructor(props: {createdAt: Date; expiresIn: number; id: AccessTokenId}) {
    super();
    this.expiresIn = props.expiresIn;
    this.id = props.id;
    this.createdAt = props.createdAt;
  }

  get expiresAt(): Date {
    return new Date(this.createdAt.getTime() + this.expiresIn * 1000);
  }

  isAvailable({date}: {date: Date}) {
    return this.expiresAt > date;
  }
}
