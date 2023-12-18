import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, Image } from "react-native";

const historyData = [
  { id: "1", title: "Coffee Workshop", date: "2021-01-01" },
  { id: "2", title: "Latte Art Competition", date: "2021-02-15" },
  { id: "3", title: "Barista Meetup", date: "2021-03-20" },
];

export const History = () => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <FlatList
      style={{ backgroundColor: "#fff" }}
      data={historyData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image
            source={{ uri: item.imageUrl }}
            style={[styles.image, { width: screenWidth - 32 }]}
          />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    borderRadius: 10,
    height: 200,
    resizeMode: "cover",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
});
