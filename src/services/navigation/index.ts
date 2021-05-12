export interface INavigator {
  navigate(name: string, params?: { [key: string]: unknown }): void;
  push(name: string, params?: { [key: string]: unknown }): void;
  pop(): void;
}
