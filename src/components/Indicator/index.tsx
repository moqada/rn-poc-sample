import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

const styles = StyleSheet.create({
  base: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, .3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Indicator = () => {
  return (
    <View style={styles.base}>
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    </View>
  );
};
export default Indicator;
