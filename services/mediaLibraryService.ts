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
  private customMedia: MediaItem[] = [];
  private customFolderPath: string | null = null;

  async requestPermissions() {
    return true;
  }

  addCustomFile(uri: string, title: string) {
    const id = `custom-${Date.now()}-${Math.random()}`;
    const isAudio = uri.toLowerCase().match(/\.(mp3|wav|m4a|aac|flac|ogg)$/);
    const isVideo = uri.toLowerCase().match(/\.(mp4|mkv|avi|mov|flv|wmv|webm)$/);

    if (isAudio || isVideo) {
      const mediaItem: MediaItem = {
        id,
        uri,
        title: title || 'Unknown',
        type: isAudio ? 'audio' : 'video',
        duration: undefined,
      };

      this.customMedia.push(mediaItem);
      return mediaItem;
    }
    return null;
  }

  setCustomFolderPath(path: string) {
    this.customFolderPath = path;
  }

  getCustomFolderPath() {
    return this.customFolderPath;
  }

  getCustomMedia() {
    return this.customMedia;
  }

  clearCustomMedia() {
    this.customMedia = [];
    this.customFolderPath = null;
  }

  async getAudioFiles(includeCustom = true): Promise<MediaItem[]> {
    try {
      let allAudio = SAMPLE_MEDIA.filter(m => m.type === 'audio');
      if (includeCustom) {
        const customAudio = this.customMedia.filter(m => m.type === 'audio');
        allAudio = [...customAudio, ...allAudio];
      }
      return allAudio;
    } catch (error) {
      console.error('Error getting audio files:', error);
      return [];
    }
  }

  async getVideoFiles(includeCustom = true): Promise<MediaItem[]> {
    try {
      let allVideo = SAMPLE_MEDIA.filter(m => m.type === 'video');
      if (includeCustom) {
        const customVideo = this.customMedia.filter(m => m.type === 'video');
        allVideo = [...customVideo, ...allVideo];
      }
      return allVideo;
    } catch (error) {
      console.error('Error getting video files:', error);
      return [];
    }
  }

  async getAllMedia(includeCustom = true): Promise<MediaItem[]> {
    try {
      let allMedia = [...SAMPLE_MEDIA];
      if (includeCustom) {
        allMedia = [...this.customMedia, ...allMedia];
      }
      return allMedia;
    } catch (error) {
      console.error('Error getting media:', error);
      return [];
    }
  }
}

export const mediaLibraryService = new MediaLibraryService();
