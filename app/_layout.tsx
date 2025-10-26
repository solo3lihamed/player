import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#e94560",
        tabBarInactiveTintColor: "#666",
        tabBarStyle: {
          backgroundColor: "#16213e",
          borderTopColor: "#0f3460",
          borderTopWidth: 1,
        },
        headerStyle: {
          backgroundColor: "#16213e",
          borderBottomColor: "#0f3460",
          borderBottomWidth: 1,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          color: "#fff",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Player",
          tabBarLabel: "Player",
          tabBarIcon: ({ color }) => (
            <Ionicons name="musical-notes" size={24} color={color} />
          ),
          headerTitle: "Music & Video Player",
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarLabel: "Library",
          tabBarIcon: ({ color }) => (
            <Ionicons name="library" size={24} color={color} />
          ),
          headerTitle: "Media Library",
        }}
      />
      <Tabs.Screen
        name="playlist"
        options={{
          title: "Playlist",
          tabBarLabel: "Playlist",
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={24} color={color} />
          ),
          headerTitle: "Queue",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
          headerTitle: "Settings",
        }}
      />
    </Tabs>
  );
}
