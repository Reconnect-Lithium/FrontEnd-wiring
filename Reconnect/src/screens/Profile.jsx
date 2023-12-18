import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Gallery } from "../components/Gallery";
import { History } from "../components/History";
import { TopBar } from "../components/TopBar";

const Tab = createMaterialTopTabNavigator();

export const Profile = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Konten header profil */}
      <TopBar />
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          style={styles.profilePhoto}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.desc}>
          Coffee enthusiast, traveler, photographer.
        </Text>
        <Text style={styles.address}>123 Coffee Street, Java Island</Text>
        <TouchableOpacity style={styles.mapButton}>
          <Text style={styles.mapButtonText}>Show on Map</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Navigator */}
      <Tab.Navigator>
        <Tab.Screen name="Gallery" component={Gallery} />
        <Tab.Screen name="History" component={History} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  desc: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginBottom: 10,
  },
  address: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
  },
  mapButton: {
    backgroundColor: "#5E17EB",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    marginHorizontal: 100,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  mapButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  tabContainer: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
});
