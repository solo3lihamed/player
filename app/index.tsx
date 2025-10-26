import { View, ScrollView, StyleSheet } from "react-native";
import Player from "../components/Player";
import Visualizer from "../components/Visualizer";
import Equalizer from "../components/Equalizer";

export default function Index() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.playerContainer}>
        <Player />
      </View>
      <View style={styles.visualizerContainer}>
        <Visualizer />
      </View>
      <Equalizer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
  playerContainer: {
    flex: 1,
    minHeight: 600,
  },
  visualizerContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});
