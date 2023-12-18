import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export const TopBar = () => {
  const handleLogout = () => {
    Alert.alert("Logout Confirmation", "Are you sure you want to Logout?", [
      {
        text: "No",
        onPress: () => console.log("Cancel Logout"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => console.log("Logout") },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Reconnect</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#5E17EB" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
});