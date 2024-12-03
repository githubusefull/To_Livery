import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing
} from 'react-native';

const Snipper = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          { transform: [{ rotate: spin }] },
        ]}
      >
        <View style={styles.crosshairHorizontal} />
        <View style={styles.crosshairVertical} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Black background for effect
  },
  circle: {
    width: 200,
    height: 200,
    borderWidth: 4,
    borderColor: '#fff',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crosshairHorizontal: {
    position: 'absolute',
    width: 150,
    height: 2,
    backgroundColor: '#fff',
  },
  crosshairVertical: {
    position: 'absolute',
    width: 2,
    height: 150,
    backgroundColor: '#fff',
  },
});

export default Snipper;
