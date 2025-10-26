import React from "react";
import { View, StyleSheet } from "react-native";
import Playlist from "../components/Playlist";

export default function PlaylistScreen() {
  return (
    <View style={styles.container}>
      <Playlist />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
});
