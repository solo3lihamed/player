import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MediaItem, usePlayerStore } from '../store/playerStore';
import { mediaLibraryService } from '../services/mediaLibraryService';

interface MediaLibraryProps {
  type?: 'audio' | 'video' | 'all';
}

export default function MediaLibrary({ type = 'all' }: MediaLibraryProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { setCurrentTrack, addToPlaylist, setPlaylist } = usePlayerStore();

  const loadMedia = useCallback(async () => {
    setLoading(true);
    try {
      let items: MediaItem[] = [];

      if (type === 'audio') {
        items = await mediaLibraryService.getAudioFiles();
      } else if (type === 'video') {
        items = await mediaLibraryService.getVideoFiles();
      } else {
        items = await mediaLibraryService.getAllMedia();
      }

      setMedia(items);
    } catch (error) {
      console.error('Error loading media:', error);
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  const handlePlayTrack = (track: MediaItem) => {
    setPlaylist([track, ...media.filter(m => m.id !== track.id)]);
    setCurrentTrack(track);
  };

  const handleAddToPlaylist = (track: MediaItem) => {
    addToPlaylist(track);
  };

  const renderMediaItem = ({ item }: { item: MediaItem }) => (
    <TouchableOpacity
      style={styles.mediaItem}
      onPress={() => handlePlayTrack(item)}
    >
      <View style={styles.mediaItemContent}>
        {item.thumbnail ? (
          <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        ) : (
          <View style={styles.placeholderThumbnail}>
            <Ionicons
              name={item.type === 'video' ? 'videocam' : 'musical-notes'}
              size={24}
              color="#fff"
            />
          </View>
        )}
        <View style={styles.mediaInfo}>
          <Text style={styles.mediaTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.mediaType}>
            {item.type === 'audio' ? '♫ Audio' : '▶ Video'}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddToPlaylist(item)}
      >
        <Ionicons name="add-circle" size={24} color="#e94560" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#e94560" />
      </View>
    );
  }

  if (media.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="folder-open" size={64} color="#666" />
        <Text style={styles.emptyText}>No media found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={media}
        keyExtractor={(item) => item.id}
        renderItem={renderMediaItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  centerContainer: {
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
  listContent: {
    padding: 15,
  },
  mediaItem: {
    flexDirection: 'row',
    backgroundColor: '#16213e',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    alignItems: 'center',
  },
  mediaItemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  placeholderThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#0f3460',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  mediaInfo: {
    flex: 1,
  },
  mediaTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  mediaType: {
    color: '#999',
    fontSize: 12,
  },
  addButton: {
    padding: 8,
  },
});
