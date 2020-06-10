import {ValueObject} from '../lib/ValueObject';
export class ExpirationDate extends ValueObject<Date> {
  isExpired(target: Date): boolean {
    return target > this.value;
  }
}
