import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    repeatMode: "off", // off, one, all
    shuffleEnabled: false,
    showLyrics: true,
    darkTheme: true,
    autoPlay: true,
    gaplessPlayback: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: typeof prev[key] === "boolean" ? !prev[key] : prev[key],
    }));
  };

  const handleRepeatMode = () => {
    const modes = ["off", "one", "all"];
    const currentIndex = modes.indexOf(settings.repeatMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setSettings((prev) => ({
      ...prev,
      repeatMode: nextMode as "off" | "one" | "all",
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Playback</Text>

        <SettingRow
          icon="shuffle"
          title="Shuffle"
          value={settings.shuffleEnabled}
          onToggle={() => handleToggle("shuffleEnabled")}
        />

        <SettingRow
          icon="repeat"
          title={`Repeat: ${
            settings.repeatMode === "off"
              ? "Off"
              : settings.repeatMode === "one"
                ? "One"
                : "All"
          }`}
          description="Tap to change repeat mode"
          onPress={handleRepeatMode}
        />

        <SettingRow
          icon="play"
          title="Auto Play"
          description="Start playing when media is selected"
          value={settings.autoPlay}
          onToggle={() => handleToggle("autoPlay")}
        />

        <SettingRow
          icon="checkmark"
          title="Gapless Playback"
          description="Remove silence between tracks"
          value={settings.gaplessPlayback}
          onToggle={() => handleToggle("gaplessPlayback")}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Display</Text>

        <SettingRow
          icon="contrast"
          title="Dark Theme"
          value={settings.darkTheme}
          onToggle={() => handleToggle("darkTheme")}
        />

        <SettingRow
          icon="text"
          title="Show Lyrics"
          description="Display song lyrics during playback"
          value={settings.showLyrics}
          onToggle={() => handleToggle("showLyrics")}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>

        <SettingRow
          icon="information-circle"
          title="Version"
          description="1.0.0"
        />

        <SettingRow
          icon="help-circle"
          title="Help & Support"
          description="Get help or report issues"
        />

        <SettingRow
          icon="document-text"
          title="Privacy Policy"
          description="Read our privacy terms"
        />
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>© 2024 Advanced Media Player</Text>
      </View>
    </ScrollView>
  );
}

interface SettingRowProps {
  icon: string;
  title: string;
  description?: string;
  value?: boolean;
  onToggle?: () => void;
  onPress?: () => void;
}

function SettingRow({
  icon,
  title,
  description,
  value,
  onToggle,
  onPress,
}: SettingRowProps) {
  return (
    <TouchableOpacity
      style={styles.settingRow}
      onPress={onPress || (onToggle && onToggle)}
    >
      <View style={styles.settingContent}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon as any} size={24} color="#e94560" />
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {description && (
            <Text style={styles.settingDescription}>{description}</Text>
          )}
        </View>
      </View>
      {value !== undefined && (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: "#16213e", true: "#e94560" }}
          thumbColor={value ? "#ff6b9d" : "#666"}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
  section: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#16213e",
  },
  sectionTitle: {
    color: "#e94560",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#0f3460",
  },
  settingContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#0f3460",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  settingDescription: {
    color: "#666",
    fontSize: 12,
  },
  footerContainer: {
    paddingVertical: 30,
    alignItems: "center",
  },
  footerText: {
    color: "#666",
    fontSize: 12,
  },
});
