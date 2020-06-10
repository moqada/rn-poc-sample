import {Identifier} from './Identifier';

export abstract class Entity<Id extends Identifier<any>> {
  abstract readonly id: Id;
  equals(val: Entity<Id>): boolean {
    return val.id === this.id;
  }
}
