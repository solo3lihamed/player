import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePlayerStore } from '../store/playerStore';
import { audioService } from '../services/audioService';

interface VolumeControlProps {
  volume: number;
}

export default function VolumeControl({ volume }: VolumeControlProps) {
  const { toggleMute, isMuted } = usePlayerStore();

  const handleToggleMute = () => {
    toggleMute();
    audioService.setVolume(isMuted ? volume : 0);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleToggleMute}>
        <Ionicons
          name={isMuted ? 'volume-mute' : 'volume-high'}
          size={24}
          color="#e94560"
        />
      </TouchableOpacity>
      <View style={styles.volumeBar}>
        <View
          style={[styles.volumeFill, { width: `${Math.min(volume * 100, 100)}%` }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  volumeBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    marginLeft: 15,
    overflow: 'hidden',
  },
  volumeFill: {
    height: '100%',
    backgroundColor: '#e94560',
  },
});
