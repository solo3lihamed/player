import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SegmentedControlIOS,
  Platform,
  ScrollView,
} from "react-native";
import MediaLibrary from "../components/MediaLibrary";
import FilePicker from "../components/FilePicker";
import { mediaLibraryService } from "../services/mediaLibraryService";

export default function LibraryScreen() {
  const [mediaType, setMediaType] = useState<"audio" | "video" | "all">("all");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleMediaTypeChange = (index: number) => {
    const types: ("audio" | "video" | "all")[] = ["all", "audio", "video"];
    setMediaType(types[index]);
  };

  const handleFileSelected = (uri: string, name: string) => {
    mediaLibraryService.addCustomFile(uri, name);
    setRefreshKey((prev) => prev + 1);
  };

  const handleFolderSelected = (path: string, name: string) => {
    mediaLibraryService.setCustomFolderPath(path);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <FilePicker
          onFileSelected={handleFileSelected}
          onFolderSelected={handleFolderSelected}
        />
        {Platform.OS === "ios" ? (
          <View style={styles.controlContainer}>
            <SegmentedControlIOS
              values={["All", "Audio", "Video"]}
              selectedIndex={
                mediaType === "all" ? 0 : mediaType === "audio" ? 1 : 2
              }
              onChange={(e) =>
                handleMediaTypeChange(e.nativeEvent.selectedSegmentIndex)
              }
              style={styles.segmentControl}
              tintColor="#e94560"
            />
          </View>
        ) : null}
      </ScrollView>
      <View style={styles.libraryContainer}>
        <MediaLibrary key={refreshKey} type={mediaType} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
  controlContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#16213e",
  },
  segmentControl: {
    height: 32,
  },
  libraryContainer: {
    flex: 1,
  },
});
