import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePlayerStore } from '../store/playerStore';
import { audioService } from '../services/audioService';

const PRESETS = {
  flat: { name: 'Flat', rates: [1, 1, 1, 1, 1] },
  bass: { name: 'Bass Boost', rates: [1.3, 1.2, 1, 0.9, 0.8] },
  treble: { name: 'Treble Boost', rates: [0.8, 0.9, 1, 1.2, 1.3] },
  pop: { name: 'Pop', rates: [1.1, 0.9, 0.8, 1, 1.2] },
  rock: { name: 'Rock', rates: [1.2, 1.1, 0.7, 0.9, 1.1] },
};

export default function Equalizer() {
  const { playbackRate, setPlaybackRate } = usePlayerStore();
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof PRESETS>('flat');

  const handlePresetSelect = async (preset: keyof typeof PRESETS) => {
    setSelectedPreset(preset);
    const avgRate = PRESETS[preset].rates.reduce((a, b) => a + b) / PRESETS[preset].rates.length;
    setPlaybackRate(avgRate);
    await audioService.setRate(avgRate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="pulse" size={24} color="#e94560" />
        <Text style={styles.title}>Equalizer</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.presetsContainer}
      >
        {Object.entries(PRESETS).map(([key, preset]) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.presetButton,
              selectedPreset === key && styles.activePreset,
            ]}
            onPress={() => handlePresetSelect(key as keyof typeof PRESETS)}
          >
            <Text
              style={[
                styles.presetText,
                selectedPreset === key && styles.activePresetText,
              ]}
            >
              {preset.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Speed</Text>
          <Text style={styles.statValue}>{playbackRate.toFixed(2)}x</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Bass</Text>
          <View style={styles.barGraph}>
            <View
              style={[
                styles.bar,
                {
                  height: `${Math.abs(PRESETS[selectedPreset].rates[0] - 1) * 100}%`,
                },
              ]}
            />
          </View>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Treble</Text>
          <View style={styles.barGraph}>
            <View
              style={[
                styles.bar,
                {
                  height: `${Math.abs(PRESETS[selectedPreset].rates[4] - 1) * 100}%`,
                },
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    borderTopWidth: 1,
    borderTopColor: '#16213e',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  presetsContainer: {
    paddingBottom: 15,
  },
  presetButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#16213e',
    marginRight: 10,
  },
  activePreset: {
    backgroundColor: '#e94560',
  },
  presetText: {
    color: '#aaa',
    fontSize: 12,
    fontWeight: '600',
  },
  activePresetText: {
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#16213e',
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#aaa',
    fontSize: 11,
    marginBottom: 8,
  },
  statValue: {
    color: '#e94560',
    fontSize: 14,
    fontWeight: 'bold',
  },
  barGraph: {
    width: 30,
    height: 50,
    backgroundColor: '#0f3460',
    borderRadius: 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 4,
  },
  bar: {
    width: '80%',
    backgroundColor: '#e94560',
    borderRadius: 2,
  },
});
