import { Audio, Video } from 'expo-av';
import { AVPlaybackStatus } from 'expo-av';
import { MediaItem } from '../store/playerStore';

export class AudioService {
  private sound: Audio.Sound | null = null;
  private video: Video | null = null;
  
  async initialize() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true,
      });
    } catch (error) {
      console.error('Error initializing audio:', error);
    }
  }

  async loadMedia(mediaItem: MediaItem) {
    try {
      if (mediaItem.type === 'audio') {
        if (this.sound) {
          await this.sound.unloadAsync();
        }
        
        this.sound = new Audio.Sound();
        await this.sound.loadAsync(
          { uri: mediaItem.uri },
          { shouldPlay: false }
        );
      }
      return true;
    } catch (error) {
      console.error('Error loading media:', error);
      return false;
    }
  }

  async play() {
    try {
      if (this.sound) {
        await this.sound.playAsync();
        return true;
      }
    } catch (error) {
      console.error('Error playing:', error);
    }
    return false;
  }

  async pause() {
    try {
      if (this.sound) {
        await this.sound.pauseAsync();
        return true;
      }
    } catch (error) {
      console.error('Error pausing:', error);
    }
    return false;
  }

  async stop() {
    try {
      if (this.sound) {
        await this.sound.stopAsync();
        return true;
      }
    } catch (error) {
      console.error('Error stopping:', error);
    }
    return false;
  }

  async seek(positionMillis: number) {
    try {
      if (this.sound) {
        await this.sound.setPositionAsync(positionMillis);
        return true;
      }
    } catch (error) {
      console.error('Error seeking:', error);
    }
    return false;
  }

  async setVolume(volume: number) {
    try {
      if (this.sound) {
        await this.sound.setVolumeAsync(Math.max(0, Math.min(1, volume)));
        return true;
      }
    } catch (error) {
      console.error('Error setting volume:', error);
    }
    return false;
  }

  async setRate(rate: number) {
    try {
      if (this.sound) {
        await this.sound.setRateAsync(rate, true);
        return true;
      }
    } catch (error) {
      console.error('Error setting rate:', error);
    }
    return false;
  }

  async getStatus(): Promise<AVPlaybackStatus | null> {
    try {
      if (this.sound) {
        return await this.sound.getStatusAsync();
      }
    } catch (error) {
      console.error('Error getting status:', error);
    }
    return null;
  }

  setOnPlaybackStatusUpdate(callback: (status: AVPlaybackStatus) => void) {
    if (this.sound) {
      this.sound.setOnPlaybackStatusUpdate(callback);
    }
  }

  async unload() {
    try {
      if (this.sound) {
        await this.sound.unloadAsync();
        this.sound = null;
      }
    } catch (error) {
      console.error('Error unloading:', error);
    }
  }
}

export const audioService = new AudioService();
