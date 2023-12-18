import React from "react";
import { View, Image, FlatList, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const images = [
  { id: "1", uri: "https://via.placeholder.com/150" },
  { id: "2", uri: "https://via.placeholder.com/150" },
  { id: "3", uri: "https://via.placeholder.com/150" },
];

export const Gallery = () => {
  const imageWidth = width / 2 - 8;
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.imageWrapper,
              { width: imageWidth, height: imageWidth },
            ]}
          >
            <Image source={{ uri: item.uri }} style={styles.image} />
          </View>
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    backgroundColor: "#fff",
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 4,
  },
  imageWrapper: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
    marginBottom: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
