type Name = string;
type Rule = {[index: string]: any};
export interface Validator<Name, T, Rule> {
  name: Name;
  rule: Rule;
  validate: (_: T) => boolean;
}
