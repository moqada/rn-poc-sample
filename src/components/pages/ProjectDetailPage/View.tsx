import React from 'react';
import { Text, View } from 'react-native';

type Props = { id: string; title: string };
export const ProjectDetailPage: React.FC<Props> = (props) => (
  <View>
    <Text>id: {props.id}</Text>
    <Text>title: {props.title}</Text>
  </View>
);
