type ZeroOrOneArgFn<T> = T extends void ? () => void : (arg: T) => void;

/**
 *  UseCase class
 */
export abstract class UseCase<A, R = void> {
  // useCase domain name
  static domain?: string;

  /**
   * unique useCase name in app
   */
  static getName() {
    return this.domain ? `${this.domain}/${this.name}` : this.name;
  }
  getName() {
    return (this.constructor as typeof UseCase).getName();
  }

  /**
   * execute useCase with arguments
   *
   * @param args - zero or one arguments for execute
   */
  abstract execute(...args: Parameters<ZeroOrOneArgFn<A>>): Promise<R>;
}

export interface UseCaseFactory<T extends UseCase<any, any>> {
  create(): T;
}

export type UseCaseCommand<A> = {
  id: string;
  useCase: UseCase<A, any>;
  args: A;
};

export type UseCaseArg<T extends UseCase<any, any>> = Parameters<
  T['execute']
>[number];

export type UseCaseType<
  T extends UseCaseFactory<any>
> = T extends UseCaseFactory<infer U> ? U : unknown;
