import {NavigationContainerRef, StackActions} from '@react-navigation/native';

export interface INavigator {
  navigate(name: string, params?: {[key: string]: unknown}): void;
  push(name: string, params?: {[key: string]: unknown}): void;
  pop(): void;
}

export class Navigator implements INavigator {
  private static instance: Navigator;
  private navigationRef: NavigationContainerRef | undefined;

  static create() {
    if (Navigator.instance) {
      return Navigator.instance;
    }
    return (Navigator.instance = new Navigator());
  }

  public setNavigationContainerRef(ref: NavigationContainerRef | null): void {
    ref && (this.navigationRef = ref);
  }

  navigate(name: string, params?: {[key: string]: unknown}) {
    this.navigationRef?.navigate(name, params);
  }

  push(name: string, params?: object | undefined) {
    this.navigationRef?.dispatch(StackActions.push(name, params));
  }

  pop(count = 1) {
    this.navigationRef?.dispatch(StackActions.pop(count));
  }
}
