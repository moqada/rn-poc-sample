import React from 'react';
import { Button, View } from 'react-native';

type Props = { onPressButton: () => void };
export const SettingPage: React.FC<Props> = (props) => (
  <View>
    <Button onPress={props.onPressButton} title="Edit" />
  </View>
);
