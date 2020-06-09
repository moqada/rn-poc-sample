import React from 'react';
import {Button} from 'react-native';

type Props = {
  children?: never;
  onPressLogout: () => void;
};
const SettingPage = ({onPressLogout}: Props) => {
  return <Button onPress={onPressLogout} title="logout" />;
};
export default SettingPage;
