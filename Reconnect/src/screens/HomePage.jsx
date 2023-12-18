import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { TopBar } from "../components/TopBar";
import { Filter } from "../components/Filter";
import { ImageSlider } from "../components/ImageSlider";
import { Text } from "react-native-paper";
import * as Location from "expo-location";
import * as SecureStore from "expo-secure-store";
import { publicRoute } from "../../url/route";
import axios from "axios";

const bannerImage = require("../../assets/Banner.png");
const screenWidth = Dimensions.get("window").width;
const bannerHeight = screenWidth * (250 / 200);

export const HomePage = ({ navigation, route }) => {
  // mas ardi
  const [location, setLocation] = useState({
    coords: { latitude: -6.2530588, longitude: 106.8152 },
  });

  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access locatiob was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // {{host}}/occasion?longitude=106.805234&latitude=-1.272244&CategoryId=2
  const [ctgy, setCtgy] = useState("");
  const [listEvent, setListEvent] = useState([]);
  useEffect(() => {
    fetchingEvent();
  }, []);
  const fetchingEvent = async () => {
    try {
      const token = await SecureStore.getItemAsync("auth");
      // console.log(token);

      const { data } = await axios({
        method: "get",
        url:
          publicRoute +
          `/occasion?longitude=106.805234&latitude=-6.272244&CategoryId=`,
        // publicRoute +
        // `/occasion?longitude=${location.coords.longitude}&latitude=${location.coords.latitude}&CategoryId=${ctgy}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      // console.log(data, ">>>>>>>>>>???");
      setListEvent(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedFilter, setSelectedFilter] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [comments, setComments] = useState([
    {
      id: "1",
      text: "Great event!",
      username: "User1",
      userImageUrl: "https://via.placeholder.com/50",
    },
    {
      id: "2",
      text: "Looking forward to this.",
      username: "User2",
      userImageUrl: "https://via.placeholder.com/50",
    },
  ]);

  const handleSelectFilter = (filter) => {
    setSelectedFilter(filter);
  };

  const handleAddComment = (commentText) => {
    const newComment = {
      id: Date.now().toString(),
      text: commentText,
      username: "NewUser",
      userImageUrl: "https://via.placeholder.com/50",
    };
    setComments([...comments, newComment]);
  };

  const isEventEnded = false;
  const handleFollowEvent = () => {
    console.log("Follow Event clicked");
    setIsFollowing(!isFollowing);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>{getGreeting()}, User!</Text>
      </View>
      <Filter onSelectFilter={handleSelectFilter} />
      <ScrollView>
        <View style={styles.bannerShadow}>
          <Image
            source={bannerImage}
            style={[styles.bannerImage, { height: bannerHeight }]}
          />
        </View>
        <Text style={styles.eventsNearby}>Events Nearby,</Text>

        {listEvent &&
          listEvent.map((el) => {
            const dateFormatStart = new Date(el.startTime).toLocaleString();
            const dateFormatEnd = new Date(el.endTime).toLocaleString();
            return (
              <ImageSlider
                key={el.eventId}
                images={el.eventPhoto}
                cafeName={el.eventName}
                eventName={el.name}
                eventTime={`${dateFormatStart} ${dateFormatEnd}`}
                eventDescription={el.description}
                isEventEnded={isEventEnded}
                onFollowEvent={handleFollowEvent}
                onPressImage={() =>
                  navigation.navigate("Detail", {
                    images: el.eventPhoto,
                    cafeName: el.eventName,
                    eventName: el.name,
                    eventTime: `${dateFormatStart} ${dateFormatEnd}`,
                    eventDescription: el.description,
                    isEventEnded: isEventEnded,
                    onFollowEvent: handleFollowEvent,
                    OccasionId: el.eventId,
                  })
                }
              />
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 10,
  },
  selectedFilterText: {
    fontSize: 16,
    marginVertical: 10,
  },
  scrollViewStyle: {
    flex: 1,
  },
  greetingContainer: {
    alignItems: "center",
    padding: 10,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  eventsNearby: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  bannerShadow: {
    margin: 10,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  bannerImage: {
    width: screenWidth - 20,
    resizeMode: "cover",
  },
});
