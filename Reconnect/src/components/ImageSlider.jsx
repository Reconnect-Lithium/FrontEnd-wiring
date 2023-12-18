import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Swiper from "react-native-swiper";
import { ReadMoreComponent } from "./ReadMore";

export const ImageSlider = ({
  images,
  cafeName,
  eventName,
  eventTime,
  eventDescription,
  isEventEnded,
  onFollowEvent,
  onPressImage,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const getTruncatedText = (text) => {
    if (text.length > 100) {
      return text.substring(0, 97) + "...";
    }
    return text;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressImage}>
        <Swiper height={240} autoplay loop>
          <Image style={styles.image} source={{ uri: images }} />
        </Swiper>
      </TouchableOpacity>
      <View style={styles.eventInfoContainer}>
        <TouchableOpacity>
          <Image
            source={{ uri: "https://via.placeholder.com/50" }}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <TouchableOpacity>
            <Text style={styles.cafeName}>{cafeName}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.eventName}>{eventName}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.followButton,
            isEventEnded && styles.followButtonDisabled,
          ]}
          onPress={onFollowEvent}
          disabled={isEventEnded}
        >
          <Text style={styles.followButtonText}>
            {isEventEnded ? "Event Ended" : "Follow"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.eventDetailsContainer}>
        <ReadMoreComponent
          truncatedText={getTruncatedText(eventDescription)}
          fullText={eventDescription}
        />
        <Text style={styles.eventTime}>Event Time {eventTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  image: {
    width: Dimensions.get("window").width,
    height: 240,
    resizeMode: "cover",
    borderRadius: 10,
  },
  eventInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingBottom: 0,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  cafeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  eventName: {
    fontSize: 16,
    marginVertical: 5,
    color: "#666",
  },
  followButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#5E17EB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2, // Shadow pada Android
  },
  followButtonDisabled: {
    backgroundColor: "#aaa",
    shadowOpacity: 0,
  },
  followButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  eventDetailsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingTop: 0,
  },
  eventTime: {
    paddingTop: 5,
    fontSize: 14,
    color: "#888",
  },
  eventDescription: {
    fontSize: 14,
    color: "#333",
    marginTop: 10,
  },
});
