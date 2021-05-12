import { AppDispatch, AppGetState } from './store';

let singleton: ReduxProvider | null = null;

type Context = {
  dispatch: AppDispatch;
  getState: AppGetState;
};

/**
 *  Redux bahavior provider in this app
 */
export class ReduxProvider {
  private _context: Context | null;

  static create(): ReduxProvider {
    if (!singleton) {
      singleton = new ReduxProvider();
    }
    return singleton;
  }

  constructor() {
    this._context = null;
  }

  setContext(context: Context) {
    this._context = context;
  }

  private getContext() {
    if (!this._context) {
      throw Error('Redux context does not exists');
    }
    return this._context;
  }

  getState() {
    return this.getContext().getState();
  }

  // FIXME: replace any type
  dispatch(action: any) {
    return this.getContext().dispatch(action);
  }
}
