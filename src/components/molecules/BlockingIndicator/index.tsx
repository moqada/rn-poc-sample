import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
});

export const BlockingIndicator: React.FC = () => {
  return (
    <View style={styles.base}>
      <ActivityIndicator size="large" />
    </View>
  );
};
