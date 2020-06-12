import {createContext} from 'react';

import {UseCaseCommander} from './UseCaseCommander';
type UseCaseProps = {
  useCaseCommander: UseCaseCommander;
};
export const UseCaseContext = createContext<UseCaseProps | undefined>(
  undefined
);
