import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Alert,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Gallery } from "../components/Gallery";
import { History } from "../components/History";
import { TopBar } from "../components/TopBar";
import * as ImagePicker from "expo-image-picker";

const Tab = createMaterialTopTabNavigator();

export const Profile = () => {
  const [profilePhoto, setProfilePhoto] = useState(
    "https://via.placeholder.com/150"
  );
  const [name, setName] = useState("John Doe");
  const [desc, setDesc] = useState(
    "Coffee enthusiast, traveler, photographer."
  );
  const [address, setAddress] = useState("123 Coffee Street, Java Island");
  const [editing, setEditing] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfilePhoto(result.uri);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopBar />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: profilePhoto }} style={styles.profilePhoto} />
        </TouchableOpacity>
        {editing ? (
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        ) : (
          <Text style={styles.name}>{name}</Text>
        )}
        {editing ? (
          <TextInput style={styles.input} value={desc} onChangeText={setDesc} />
        ) : (
          <Text style={styles.desc}>{desc}</Text>
        )}
        {editing ? (
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />
        ) : (
          <Text style={styles.address}>{address}</Text>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setEditing(!editing)}
        >
          <Text style={styles.buttonText}>
            {editing ? "Save Changes" : "Edit Profile"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonMap}>
          <Text style={styles.buttonText}>Show on Map</Text>
        </TouchableOpacity>
      </View>

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
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#ddd",
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
  button: {
    backgroundColor: "grey",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    marginHorizontal: 50,
    marginBottom: 10,
  },
  buttonMap: {
    backgroundColor: "#5E17EB",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    marginHorizontal: 50,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
});
