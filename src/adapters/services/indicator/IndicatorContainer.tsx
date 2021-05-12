import React from 'react';
import { useSelector } from 'react-redux';
import { BlockingIndicator } from '../../../components/molecules/BlockingIndicator';
import { indicatorSelectors } from './redux/indicatorSlice';

export const IndicatorContainer = () => {
  const isVisible = useSelector(indicatorSelectors.isVisible);
  return isVisible ? <BlockingIndicator /> : null;
};
