import * as routeNames from './routeNames';

export type HomeTabParamList = {
  [routeNames.HOME]: undefined;
  [routeNames.SETTING]: undefined;
};
export type RootParamList = {
  [routeNames.HOME_TAB_NAV]: undefined;
  [routeNames.PROJECT_DETAIL]: { id: string };
};
