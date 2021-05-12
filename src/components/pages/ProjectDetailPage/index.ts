import React from 'react';
import { useProjectDetailPage } from './hooks';
import { ProjectDetailPage as View } from './View';
export const ProjectDetailPage: React.FC<void> = () => {
  const props = useProjectDetailPage();
  return View(props);
};
