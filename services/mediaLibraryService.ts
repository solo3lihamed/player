import { MediaItem } from '../store/playerStore';

const SAMPLE_MEDIA: MediaItem[] = [
  {
    id: '1',
    uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    title: 'Sample Track 1 - Sound Helix',
    artist: 'Sound Helix',
    duration: 360000,
    type: 'audio',
  },
  {
    id: '2',
    uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    title: 'Sample Track 2 - Sound Helix',
    artist: 'Sound Helix',
    duration: 360000,
    type: 'audio',
  },
  {
    id: '3',
    uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    title: 'Sample Track 3 - Sound Helix',
    artist: 'Sound Helix',
    duration: 360000,
    type: 'audio',
  },
  {
    id: '4',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4',
    title: 'Big Buck Bunny - Sample Video',
    artist: 'Blender Foundation',
    duration: 600000,
    type: 'video',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/images/big_buck_bunny.jpg',
  },
];

export class MediaLibraryService {
  async requestPermissions() {
    return true;
  }

  async getAudioFiles(): Promise<MediaItem[]> {
    try {
      return SAMPLE_MEDIA.filter(m => m.type === 'audio');
    } catch (error) {
      console.error('Error getting audio files:', error);
      return [];
    }
  }

  async getVideoFiles(): Promise<MediaItem[]> {
    try {
      return SAMPLE_MEDIA.filter(m => m.type === 'video');
    } catch (error) {
      console.error('Error getting video files:', error);
      return [];
    }
  }

  async getAllMedia(): Promise<MediaItem[]> {
    try {
      return SAMPLE_MEDIA;
    } catch (error) {
      console.error('Error getting media:', error);
      return [];
    }
  }
}

export const mediaLibraryService = new MediaLibraryService();
