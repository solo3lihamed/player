import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AVPlaybackStatus } from 'expo-av';
import { usePlayerStore } from '../store/playerStore';
import { audioService } from '../services/audioService';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';

const { width } = Dimensions.get('window');

export default function Player() {
  const {
    currentTrack,
    isPlaying,
    volume,
    duration,
    currentPosition,
    setIsPlaying,
    setDuration,
    setCurrentPosition,
    nextTrack,
    previousTrack,
  } = usePlayerStore();

  const statusUpdateSubscription = useRef<any>(null);

  useEffect(() => {
    audioService.initialize();
  }, []);

  useEffect(() => {
    if (currentTrack) {
      loadAndPlayTrack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

  const loadAndPlayTrack = async () => {
    if (!currentTrack) return;

    try {
      const loaded = await audioService.loadMedia(currentTrack);
      if (loaded) {
        const status = await audioService.getStatus();
        if (status && 'durationMillis' in status) {
          setDuration(status.durationMillis || 0);
        }

        statusUpdateSubscription.current = audioService.setOnPlaybackStatusUpdate(
          (status: AVPlaybackStatus) => {
            if (status.isLoaded) {
              setCurrentPosition(status.positionMillis || 0);
              setDuration(status.durationMillis || 0);

              if (status.didJustFinish && !status.isLooping) {
                nextTrack();
              }
            }
          }
        );

        await audioService.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error loading track:', error);
    }
  };

  const handlePlayPause = async () => {
    if (!currentTrack) return;

    if (isPlaying) {
      await audioService.pause();
      setIsPlaying(false);
    } else {
      await audioService.play();
      setIsPlaying(true);
    }
  };

  const handlePrevious = async () => {
    await audioService.stop();
    previousTrack();
  };

  const handleNext = async () => {
    await audioService.stop();
    nextTrack();
  };

  const handleSeek = async (position: number) => {
    await audioService.seek(position);
    setCurrentPosition(position);
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!currentTrack) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="musical-notes" size={64} color="#666" />
        <Text style={styles.emptyText}>No track selected</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.albumArtContainer}>
        {currentTrack.thumbnail ? (
          <Image
            source={{ uri: currentTrack.thumbnail }}
            style={styles.albumArt}
          />
        ) : (
          <View style={styles.placeholderArt}>
            <Ionicons
              name={currentTrack.type === 'video' ? 'videocam' : 'musical-notes'}
              size={80}
              color="#fff"
            />
          </View>
        )}
      </View>

      <View style={styles.trackInfoContainer}>
        <Text style={styles.trackTitle} numberOfLines={1}>
          {currentTrack.title}
        </Text>
        <Text style={styles.trackArtist} numberOfLines={1}>
          {currentTrack.artist || 'Unknown Artist'}
        </Text>
      </View>

      <ProgressBar
        currentPosition={currentPosition}
        duration={duration}
        onSeek={handleSeek}
      />

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(currentPosition)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={handlePrevious}>
          <Ionicons name="play-skip-back" size={32} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.playButton}
          onPress={handlePlayPause}
        >
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={48}
            color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={handleNext}>
          <Ionicons name="play-skip-forward" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      <VolumeControl volume={volume} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    marginTop: 10,
  },
  albumArtContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  albumArt: {
    width: width - 40,
    height: width - 40,
    borderRadius: 20,
  },
  placeholderArt: {
    width: width - 40,
    height: width - 40,
    borderRadius: 20,
    backgroundColor: '#16213e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackInfoContainer: {
    marginBottom: 20,
  },
  trackTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  trackArtist: {
    color: '#aaa',
    fontSize: 14,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeText: {
    color: '#aaa',
    fontSize: 12,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  controlButton: {
    marginHorizontal: 20,
  },
  playButton: {
    backgroundColor: '#e94560',
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
