import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
//import Location from './Location';

export default function GoogleMap() {
  


  return (
    <View style={styles.container}>
      <MapView style={styles.map}  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});