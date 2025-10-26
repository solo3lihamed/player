import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressBarProps {
  currentPosition: number;
  duration: number;
  onSeek: (position: number) => void;
}

export default function ProgressBar({
  currentPosition,
  duration,
  onSeek,
}: ProgressBarProps) {
  const progress = duration > 0 ? currentPosition / duration : 0;

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progress,
            { width: `${Math.min(progress * 100, 100)}%` },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#e94560',
  },
});
