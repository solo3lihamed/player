import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

interface FilePickerProps {
  onFileSelected: (uri: string, name: string) => void;
  onFolderSelected: (path: string, name: string) => void;
}

interface SelectedPath {
  uri: string;
  name: string;
  type: 'file' | 'folder';
}

export default function FilePicker({ onFileSelected, onFolderSelected }: FilePickerProps) {
  const [selectedPaths, setSelectedPaths] = useState<SelectedPath[]>([]);

  const handlePickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['audio/*', 'video/*'],
        multiple: true,
      });

      if (result.assets && result.assets.length > 0) {
        result.assets.forEach((asset) => {
          if (asset.uri) {
            const isAudio = asset.mimeType?.startsWith('audio/');
            const isVideo = asset.mimeType?.startsWith('video/');

            if (isAudio || isVideo) {
              onFileSelected(asset.uri, asset.name || 'Unknown');
              addSelectedPath({
                uri: asset.uri,
                name: asset.name || 'Unknown',
                type: 'file',
              });
            }
          }
        });

        if (result.assets.length > 0) {
          Alert.alert('Success', `Added ${result.assets.length} file(s)`);
        }
      }
    } catch (error) {
      if (error instanceof Error && !error.message.includes('cancelled')) {
        Alert.alert('Error', 'Failed to pick files');
        console.error('File picker error:', error);
      }
    }
  };

  const handlePickFolder = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'folder',
      });

      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        if (asset.uri) {
          onFolderSelected(asset.uri, asset.name || 'Folder');
          addSelectedPath({
            uri: asset.uri,
            name: asset.name || 'Folder',
            type: 'folder',
          });
          Alert.alert('Success', `Selected folder: ${asset.name}`);
        }
      }
    } catch (error) {
      if (error instanceof Error && !error.message.includes('cancelled')) {
        Alert.alert('Error', 'Failed to pick folder');
        console.error('Folder picker error:', error);
      }
    }
  };

  const addSelectedPath = (path: SelectedPath) => {
    setSelectedPaths((prev) => {
      const filtered = prev.filter((p) => p.uri !== path.uri);
      return [path, ...filtered].slice(0, 10);
    });
  };

  const removeSelectedPath = (uri: string) => {
    setSelectedPaths((prev) => prev.filter((p) => p.uri !== uri));
  };

  const clearAll = () => {
    setSelectedPaths([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.pickButton} onPress={handlePickFile}>
          <Ionicons name="document" size={20} color="#fff" />
          <Text style={styles.buttonText}>Select Files</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pickButton} onPress={handlePickFolder}>
          <Ionicons name="folder" size={20} color="#fff" />
          <Text style={styles.buttonText}>Select Folder</Text>
        </TouchableOpacity>
      </View>

      {selectedPaths.length > 0 && (
        <View style={styles.pathsContainer}>
          <View style={styles.pathsHeader}>
            <Text style={styles.pathsTitle}>Selected Items ({selectedPaths.length})</Text>
            <TouchableOpacity onPress={clearAll}>
              <Ionicons name="trash" size={18} color="#e94560" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.pathsList}>
            {selectedPaths.map((path) => (
              <View key={path.uri} style={styles.pathItem}>
                <View style={styles.pathItemContent}>
                  <Ionicons
                    name={path.type === 'folder' ? 'folder' : 'document'}
                    size={18}
                    color="#e94560"
                    style={styles.pathIcon}
                  />
                  <View style={styles.pathInfo}>
                    <Text style={styles.pathName} numberOfLines={1}>
                      {path.name}
                    </Text>
                    <Text style={styles.pathType}>
                      {path.type === 'folder' ? 'Folder' : 'File'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => removeSelectedPath(path.uri)}>
                  <Ionicons name="close-circle" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#16213e',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  pickButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e94560',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 13,
  },
  pathsContainer: {
    marginTop: 15,
    backgroundColor: '#0f3460',
    borderRadius: 8,
    overflow: 'hidden',
  },
  pathsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#16213e',
  },
  pathsTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  pathsList: {
    maxHeight: 200,
  },
  pathItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#16213e',
  },
  pathItemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pathIcon: {
    marginRight: 10,
  },
  pathInfo: {
    flex: 1,
  },
  pathName: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  pathType: {
    color: '#666',
    fontSize: 11,
  },
});
