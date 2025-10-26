import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MediaItem, usePlayerStore } from '../store/playerStore';

export default function Playlist() {
  const {
    playlist,
    currentTrack,
    setCurrentTrack,
    removeFromPlaylist,
    clearPlaylist,
  } = usePlayerStore();

  const renderPlaylistItem = ({ item }: { item: MediaItem }) => {
    const isCurrentTrack = currentTrack?.id === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.playlistItem,
          isCurrentTrack && styles.activePlaylistItem,
        ]}
        onPress={() => setCurrentTrack(item)}
      >
        <View style={styles.itemContent}>
          <Text style={styles.itemNumber}>
            {playlist.indexOf(item) + 1}
          </Text>
          <View style={styles.itemInfo}>
            <Text
              style={[
                styles.itemTitle,
                isCurrentTrack && styles.activeItemTitle,
              ]}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <Text style={styles.itemType}>
              {item.type === 'audio' ? '♫' : '▶'} {item.type}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => removeFromPlaylist(item.id)}
          style={styles.removeButton}
        >
          <Ionicons name="close" size={20} color="#e94560" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Playlist ({playlist.length})</Text>
        {playlist.length > 0 && (
          <TouchableOpacity onPress={clearPlaylist}>
            <Ionicons name="trash" size={20} color="#e94560" />
          </TouchableOpacity>
        )}
      </View>

      {playlist.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="list" size={64} color="#666" />
          <Text style={styles.emptyText}>Playlist is empty</Text>
        </View>
      ) : (
        <FlatList
          data={playlist}
          keyExtractor={(item) => item.id}
          renderItem={renderPlaylistItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#16213e',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    marginTop: 10,
  },
  listContent: {
    padding: 15,
  },
  playlistItem: {
    flexDirection: 'row',
    backgroundColor: '#16213e',
    borderRadius: 12,
    marginBottom: 10,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activePlaylistItem: {
    backgroundColor: '#0f3460',
    borderLeftWidth: 4,
    borderLeftColor: '#e94560',
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemNumber: {
    color: '#999',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 12,
    width: 20,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  activeItemTitle: {
    color: '#e94560',
    fontWeight: 'bold',
  },
  itemType: {
    color: '#666',
    fontSize: 11,
  },
  removeButton: {
    padding: 8,
  },
});
