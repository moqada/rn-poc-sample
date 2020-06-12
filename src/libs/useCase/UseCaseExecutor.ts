import {EventEmitter} from 'events';

import {UseCaseCommand} from './interfaces';
const USECASE_EVENT_TYPES = {
  commanded: 'useCase/commanded',
  failed: 'useCase/failed',
  succeeded: 'useCase/succeeded',
};
type UseCaseEventCommanded = {
  type: typeof USECASE_EVENT_TYPES.commanded;
  command: UseCaseCommand<any>;
};
type UseCaseEventFailed = {
  type: typeof USECASE_EVENT_TYPES.failed;
  command: UseCaseCommand<any>;
  error: any;
};
type UseCaseEventSucceeded = {
  type: typeof USECASE_EVENT_TYPES.succeeded;
  command: UseCaseCommand<any>;
  result: any;
};

export class UseCaseExecutor extends EventEmitter {
  async execute(command: UseCaseCommand<any>) {
    this.emit(USECASE_EVENT_TYPES.commanded, {
      type: USECASE_EVENT_TYPES.commanded,
      command,
    });
    try {
      const result = await command.useCase.execute(command.args);
      this.emit(USECASE_EVENT_TYPES.succeeded, {
        type: USECASE_EVENT_TYPES.commanded,
        command,
        result,
      });
    } catch (error) {
      this.emit(USECASE_EVENT_TYPES.succeeded, {
        type: USECASE_EVENT_TYPES.commanded,
        command,
        error,
      });
    }
  }
}
