import { Action } from '@reduxjs/toolkit';

import { UseCaseAction } from './useCaseSlice';

const ACTION_PREFIX = 'useCase/';

/**
 * format useCase action in Redux DevTools
 *
 * @param action - redux action
 */
export const actionSanitizer = <A extends Action<any>>(action: A): A => {
  if (action.type.indexOf(ACTION_PREFIX) >= 0) {
    const { payload } = (action as any) as UseCaseAction;
    const suffix = action.type.replace(ACTION_PREFIX, '');
    return {
      ...action,
      type: `${ACTION_PREFIX}${payload.name}/${suffix}`,
    };
  }
  return action;
};
