import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SegmentedControlIOS,
  Platform,
} from "react-native";
import MediaLibrary from "../components/MediaLibrary";

export default function LibraryScreen() {
  const [mediaType, setMediaType] = useState<"audio" | "video" | "all">("all");

  const handleMediaTypeChange = (index: number) => {
    const types: ("audio" | "video" | "all")[] = ["all", "audio", "video"];
    setMediaType(types[index]);
  };

  return (
    <View style={styles.container}>
      {Platform.OS === "ios" ? (
        <View style={styles.controlContainer}>
          <SegmentedControlIOS
            values={["All", "Audio", "Video"]}
            selectedIndex={mediaType === "all" ? 0 : mediaType === "audio" ? 1 : 2}
            onChange={(e) => handleMediaTypeChange(e.nativeEvent.selectedSegmentIndex)}
            style={styles.segmentControl}
            tintColor="#e94560"
          />
        </View>
      ) : null}
      <MediaLibrary type={mediaType} />
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
});
