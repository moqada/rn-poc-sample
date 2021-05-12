import React from 'react';

import { UseCaseContext } from './UseCaseContext';

/**
 * hooks use useCaseCommander
 */
export const useUseCaseCommander = () => {
  const context = React.useContext(UseCaseContext);
  if (!context) {
    throw new Error('UseCaseContext could not find.');
  }
  return context.useCaseCommander;
};
