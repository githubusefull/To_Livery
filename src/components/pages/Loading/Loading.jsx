import React, { useEffect, useRef } from 'react';
import { View,  StyleSheet, Animated } from 'react-native';

const Loading = () => {
  const bounceAnim = useRef(new Animated.Value(0)).current; // Initialize animated value

  useEffect(() => {
    const bounce = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10, // Move up
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0, // Move back to original position
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    bounce.start();

    // Cleanup on unmount
    return () => bounce.stop();
  }, [bounceAnim]);

  return (
    <View style={styles.container}>
          <View style={styles.containerLogo}>

      <Animated.Image
        source={require('../../../../assets/car.png')}
        style={[styles.image, { transform: [{ translateY: bounceAnim }] }]} // Apply animation
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  containerLogo: {
    padding: 20, 
    backgroundColor: 'white', 
    borderRadius: 10
   },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',

  },
  image: {
    width: 120,
    height: 120,
  },
});

export default Loading;
