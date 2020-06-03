import React from 'react';
import {useSelector} from 'react-redux';

import Indicator from '@components/Indicator';

import {selectors} from '../../redux/features/app/indicatorSlice';

const ConnectedIndicator = () => {
  const visible = useSelector(selectors.selectVisible);
  return visible ? <Indicator /> : null;
};
export default ConnectedIndicator;
