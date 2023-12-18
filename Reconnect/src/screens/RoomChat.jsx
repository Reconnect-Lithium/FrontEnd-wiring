import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";
import { publicRoute } from "../../url/route";
import axios from "axios";
// socket
import io from "socket.io-client";
const socket = io(publicRoute);

export const RoomChat = ({ route }) => {
  const { roomId } = route.params;
  // console.log(roomId < "?>?>?");
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingAnimation = new Animated.Value(0);

  useEffect(() => {
    let timeout;
    if (isTyping) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(typingAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(typingAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      typingAnimation.setValue(0);
      Animated.loop(Animated.timing(typingAnimation)).stop();
    }

    return () => clearTimeout(timeout);
  }, [isTyping, typingAnimation]);

  // socket - fetching
  useEffect(() => {
    fetching(roomId);
    socket.emit("CLIENT_ROOMS", roomId);
  }, [roomId]);

  useEffect(() => {
    socket.on("SERVER_SEND_RESPONSE", (data) => {
      console.log(data, "?????????");

      setMessages((last) => {
        return [data, ...last];
      });
    });
  }, [socket]);

  const fetching = async (roomId) => {
    try {
      const token = await SecureStore.getItemAsync("auth");
      //   console.log(token);

      const { data } = await axios({
        method: "get",
        url: publicRoute + "/room/list-message/" + roomId,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      //   console.log(data);
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMsg = (value) => {
    setForm(value);
  };

  const handleSubmit = async () => {
    // console.log(form);
    try {
      const token = await SecureStore.getItemAsync("auth");
      // console.log(roomId);
      const { data } = await axios({
        method: "post",
        url: publicRoute + "/room/create-message/" + roomId,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          message: form,
        },
      }); // productions
      // console.log(data);k
      const send = {
        newMessage: data,
        roomId,
      };

      socket.emit("CLIENT_SEND_MSG", send); // socket
      setMessages((last) => {
        return [send.newMessage, ...last];
      });
    } catch (error) {
      console.log(error, ">>>>>>>>");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={80}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={30} color="#007aff" />
        </TouchableOpacity>
        <Image
          style={styles.profileIcon}
          source={{ uri: "https://via.placeholder.com/40" }}
        />
        <Text style={styles.userName}>User Name</Text>
      </View>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((message) => (
          <View key={message.id} style={styles.messageBubble}>
            <Text style={styles.messageText}>{message.message}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.typingIndicatorContainer}>
        <Animated.View
          style={[styles.typingIndicator, { opacity: typingAnimation }]}
        >
          <Text>Someone is typing...</Text>
        </Animated.View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(value) => {
            handleMsg(value);
          }}
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(false)}
          placeholder="Type a message..."
        />
        <TouchableOpacity // action login
          onPress={async () => {
            handleSubmit();
          }}
        >
          <Ionicons name="send" size={24} color="blue" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 50 : 10, // Adjust status bar height
    paddingBottom: 10,
    backgroundColor: "#f7f7f7",
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  backButton: {
    marginLeft: 10,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    backgroundColor: "#e5e5ea",
    borderRadius: 20,
    padding: 10,
    marginVertical: 4,
    maxWidth: "70%",
    alignSelf: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  input: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
  },
  typingIndicatorContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  typingIndicator: {
    height: 20,
  },
});
