import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { usePlayerStore } from '../store/playerStore';

const { width } = Dimensions.get('window');
const BARS = 40;

export default function Visualizer() {
  const { isPlaying } = usePlayerStore();
  const animatedValues = useRef(
    Array.from({ length: BARS }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    if (!isPlaying) {
      animatedValues.forEach((anim) => {
        Animated.timing(anim, {
          toValue: 0.2,
          duration: 200,
          useNativeDriver: false,
        }).start();
      });
      return;
    }

    const interval = setInterval(() => {
      animatedValues.forEach((anim) => {
        const randomHeight = Math.random();
        Animated.timing(anim, {
          toValue: randomHeight,
          duration: 100,
          useNativeDriver: false,
        }).start();
      });
    }, 100);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  const barWidth = width / (BARS + 1);

  return (
    <View style={styles.container}>
      <View style={styles.visualizerContainer}>
        {animatedValues.map((anim, index) => (
          <Animated.View
            key={index}
            style={[
              styles.bar,
              {
                width: barWidth - 4,
                height: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['10%', '100%'],
                }),
                backgroundColor: anim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ['#0f3460', '#e94560', '#ff6b9d'],
                }),
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    padding: 20,
    borderRadius: 12,
  },
  visualizerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 120,
    backgroundColor: '#0f3460',
    borderRadius: 10,
  },
  bar: {
    marginHorizontal: 2,
    borderRadius: 2,
  },
});
