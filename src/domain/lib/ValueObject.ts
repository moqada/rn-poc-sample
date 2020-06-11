import assert from 'assert';

import {validate, Validator} from './Validator';
export abstract class ValueObject<T> {
  static readonly validators: Array<Validator<any, any>>;
  protected readonly value: T;
  constructor(value: T) {
    assert(validate(this.constructor as typeof ValueObject, value) === null);
    this.value = value;
  }

  equals(val: ValueObject<T>): boolean {
    return val.value === val.value;
  }
}
