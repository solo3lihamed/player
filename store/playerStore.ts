import { create } from 'zustand';
import { AVPlaybackStatus, Audio } from 'expo-av';

export interface MediaItem {
  id: string;
  uri: string;
  title: string;
  artist?: string;
  duration?: number;
  type: 'audio' | 'video';
  thumbnail?: string;
}

interface PlayerState {
  currentTrack: MediaItem | null;
  playlist: MediaItem[];
  isPlaying: boolean;
  currentPosition: number;
  duration: number;
  volume: number;
  playbackRate: number;
  isMuted: boolean;
  
  setCurrentTrack: (track: MediaItem | null) => void;
  setPlaylist: (playlist: MediaItem[]) => void;
  addToPlaylist: (track: MediaItem) => void;
  removeFromPlaylist: (id: string) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentPosition: (position: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  setPlaybackRate: (rate: number) => void;
  toggleMute: () => void;
  clearPlaylist: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  playlist: [],
  isPlaying: false,
  currentPosition: 0,
  duration: 0,
  volume: 1,
  playbackRate: 1,
  isMuted: false,
  
  setCurrentTrack: (track) => set({ currentTrack: track }),
  setPlaylist: (playlist) => set({ playlist }),
  addToPlaylist: (track) => set((state) => ({
    playlist: [...state.playlist, track]
  })),
  removeFromPlaylist: (id) => set((state) => ({
    playlist: state.playlist.filter(t => t.id !== id)
  })),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentPosition: (position) => set({ currentPosition: position }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume }),
  setPlaybackRate: (rate) => set({ playbackRate: rate }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  clearPlaylist: () => set({ playlist: [], currentTrack: null }),
  
  nextTrack: () => set((state) => {
    if (!state.currentTrack) return state;
    const currentIndex = state.playlist.findIndex(t => t.id === state.currentTrack?.id);
    const nextIndex = (currentIndex + 1) % state.playlist.length;
    return { currentTrack: state.playlist[nextIndex] };
  }),
  
  previousTrack: () => set((state) => {
    if (!state.currentTrack) return state;
    const currentIndex = state.playlist.findIndex(t => t.id === state.currentTrack?.id);
    const prevIndex = currentIndex - 1 < 0 ? state.playlist.length - 1 : currentIndex - 1;
    return { currentTrack: state.playlist[prevIndex] };
  }),
}));
