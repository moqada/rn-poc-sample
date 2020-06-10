// import {Validator} from './Validator';

export abstract class ValueObject<T> {
  // static readonly validators: Array<Validator>;
  protected readonly value: T;
  constructor(value: T) {
    this.value = value;
  }

  equals(val: ValueObject<T>): boolean {
    // const validators = <typeof ValueObject>this.constructor.validators;
    return val.value === val.value;
  }
}
