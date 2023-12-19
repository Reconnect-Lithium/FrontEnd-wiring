import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
export default function OccasionListItem({
  data,
  handleDirection,
  handleClose,
}) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: data.image }} style={styles.image} />
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View style={{ marginLeft: 5, marginTop: 5 }}>
          <TouchableOpacity
            onPress={handleClose}
            style={{ position: "absolute", right: 0, top: -20, padding: 5 }}
          >
            <Text style={{ color: "red", fontWeight: "bold", fontSize: 16 }}>
              X
            </Text>
          </TouchableOpacity>
          <Text style={{ fontWeight: "bold" }}>{data.title}</Text>
          <Text style={{ color: "gray" }}>by: cafe name</Text>
          <Text style={{ color: "gray" }}>start time :</Text>
          <Text style={{ color: "gray" }}>end time :</Text>
          <Text style={{ color: "gray" }}>category :</Text>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <TouchableOpacity
              onPress={() => handleDirection(data)}
              style={styles.touchableDirection}
            >
              <Text style={styles.textDirection}>Direction</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDirection(data)}
              style={styles.touchableDetail}
            >
              <Text style={styles.textDirection}>Show Detail</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 40,
    padding: 10,
    right: 10,
    left: 10,
    flexDirection: "row",
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: 150,
    aspectRatio: 1,
    borderRadius: 5,
    marginVertical: "auto",
  },
  textDirection: {
    color: "white",
    fontWeight: "bold",
  },
  touchableDirection: {
    borderRadius: 5,
    padding: 5,
    backgroundColor: "#2196F3",
  },
  touchableDetail: {
    marginLeft: 5,
    borderRadius: 5,
    padding: 5,
    backgroundColor: "#000000",
  },
});