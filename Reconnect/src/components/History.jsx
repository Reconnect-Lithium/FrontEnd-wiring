import React, { Fragment } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";

const historyData = [
  { id: "1", title: "Coffee Workshop", date: "2021-01-01" },
  { id: "2", title: "Latte Art Competition", date: "2021-02-15" },
  { id: "3", title: "Barista Meetup", date: "2021-03-20" },
];

export const History = ({ eventhistory }) => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <Fragment>
      {eventhistory.length === 0 ? (
        <Text> No History Data</Text>
      ) : (
        <FlatList
          style={{ backgroundColor: "#fff" }}
          data={eventhistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image
                source={{ uri: item.photo }}
                style={[styles.image, { width: screenWidth - 32 }]}
              />
              <Text style={styles.title}>{item.eventName}</Text>
              <Text style={styles.date}>{`Start :${item.startTime}`}</Text>
              <Text style={styles.date}>{`End   :${item.endTime}`}</Text>
            </View>
          )}
        />
      )}
    </Fragment>
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
