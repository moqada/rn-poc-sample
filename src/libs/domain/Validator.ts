type Name = string;
type Rule = {[index: string]: any};

export interface Validator<T, R extends Rule> {
  name: string;
  rule: R;
  validate: (_: T) => boolean;
}

export interface Validatable<T> {
  validators: Array<Validator<T, any>>;
}

export interface ValidationError<T> {
  [index: string]: Validator<T, any>;
}

export function validate<V>(
  VO: Validatable<V>,
  value: V
): ValidationError<V> | null {
  let errors = {};
  const isValid = (VO.validators || []).every((validator) => {
    const ret = validator.validate(value);
    if (!ret) {
      errors = {...errors, [validator.name]: validator};
    }
    return ret;
  });
  return isValid ? null : errors;
}
