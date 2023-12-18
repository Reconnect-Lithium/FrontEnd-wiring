import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import { TopBar } from "../components/TopBar";

export const CreateEvent = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["Category 1", "Category 2", "Category 3", "Category 4"];

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setCategoryModalVisible(false);
  };

  const closeModal = () => setCategoryModalVisible(false);

  const validateTime = (time) => {
    const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  };

  const handleTimeChange = (text, setTime) => {
    const newTime = text.replace(/[^0-9]/g, "");
    if (newTime.length >= 2) {
      setTime(`${newTime.slice(0, 2)}:${newTime.slice(2, 4)}`);
    } else {
      setTime(newTime);
    }
  };

  const submitTime = (time, setTime) => {
    if (validateTime(time)) {
      setTime(time);
    } else {
      alert("Invalid time format. Please use HH:mm format.");
    }
  };

  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.containerInner}>
        <Text style={styles.title}>Create Event</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Start Time (HH:mm)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Start Time"
            value={startTime}
            onChangeText={(text) => handleTimeChange(text, setStartTime)}
            onEndEditing={() => submitTime(startTime, setStartTime)}
            keyboardType="numeric"
            maxLength={5}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>End Time (HH:mm)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter End Time"
            value={endTime}
            onChangeText={(text) => handleTimeChange(text, setEndTime)}
            onEndEditing={() => submitTime(endTime, setEndTime)}
            keyboardType="numeric"
            maxLength={5}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Description"
            multiline
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Category</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setCategoryModalVisible(true)}
          >
            <Text>{selectedCategory || "Select Category"}</Text>
          </TouchableOpacity>
        </View>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={categoryModalVisible}
          onRequestClose={closeModal}
        >
          {/* Modal background */}
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={closeModal} // Close the modal when the background is pressed
          >
            {/* Prevent modal close when the modal view is pressed */}
            <View
              style={styles.modalContainer}
              onStartShouldSetResponder={() => true}
            >
              <ScrollView>
                {categories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.modalItem}
                    onPress={() => handleSelectCategory(category)}
                  >
                    <Text style={styles.modalText}>{category}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Modal>

        <Image
          style={styles.imagePreview}
          source={{ uri: "https://via.placeholder.com/150" }}
        />

        <TouchableOpacity style={styles.imagePicker}>
          <Text style={styles.imagePickerText}>Upload Image</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Create New Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerInner: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalText: {
    textAlign: "center",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  imagePickerText: {
    color: "#5E17EB",
  },
  imagePreview: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: "#5E17EB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
