export abstract class UseCase<A, R> {
  abstract async execute(_: A): Promise<R>;
}
