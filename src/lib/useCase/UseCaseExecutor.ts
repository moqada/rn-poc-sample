import { EventEmitter } from 'events';

import { UseCaseCommand } from './UseCase';

export const USECASE_EVENT_TYPES = {
  commanded: 'commanded',
  failed: 'failed',
  succeeded: 'succeeded',
};
export type UseCaseEventType = keyof typeof USECASE_EVENT_TYPES;
export type UseCaseEventCommanded = {
  type: typeof USECASE_EVENT_TYPES.commanded;
  command: UseCaseCommand<any>;
};
export type UseCaseEventFailed = {
  type: typeof USECASE_EVENT_TYPES.failed;
  command: UseCaseCommand<any>;
  error: any;
};
export type UseCaseEventSucceeded = {
  type: typeof USECASE_EVENT_TYPES.succeeded;
  command: UseCaseCommand<any>;
  result: any;
};
export type UseCaseEvent =
  | UseCaseEventCommanded
  | UseCaseEventSucceeded
  | UseCaseEventFailed;
export type UseCaseEventListner = (_: UseCaseEvent) => void;

/**
 * UseCaseExecutor
 *
 * emit useCaseEvent when receive status of executing useCase
 */
export class UseCaseExecutor {
  private eventTypeEmitChange = 'change';
  private emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  private emitChange(ev: UseCaseEvent) {
    this.emitter.emit(this.eventTypeEmitChange, ev);
  }

  /**
   * subscribe useCaseEvent
   *
   * @param listener - useCaseEvent listener
   */
  onChange(listener: UseCaseEventListner) {
    this.emitter.addListener(this.eventTypeEmitChange, listener);
    return this.emitter.removeListener.bind(
      this,
      this.eventTypeEmitChange,
      listener
    );
  }

  /**
   * execute useCaseCommand
   *
   * @param command - UseCaseCommand
   */
  async execute(command: UseCaseCommand<any>) {
    this.emitChange({ command, type: USECASE_EVENT_TYPES.commanded });
    try {
      const result = await command.useCase.execute(command.args);
      this.emitChange({ command, result, type: USECASE_EVENT_TYPES.succeeded });
    } catch (error) {
      this.emitChange({ command, error, type: USECASE_EVENT_TYPES.failed });
      console.info(error);
    }
  }
}
