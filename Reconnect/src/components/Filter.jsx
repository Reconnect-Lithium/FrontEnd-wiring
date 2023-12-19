import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from "react-native";

export const Filter = ({ onSelectFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { label: "All", value: "all" },
    { label: "Music", value: "music" },
    { label: "Stand Up Comedy", value: "standUpComedy" },
    { label: "Performance", value: "performance" },
    { label: "Competitions", value: "competitions" },
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onSelectFilter(category);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.buttonsContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.value}
            style={[
              styles.button,
              selectedCategory === category.value && styles.selectedButton,
            ]}
            onPress={() => handleCategoryChange(category.value)}
          >
            <Text
              style={[
                styles.buttonText,
                selectedCategory === category.value && styles.selectedButtonText,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  buttonsContainer: {
    paddingHorizontal: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#eee",
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: "#5E17EB",
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
    textAlign: 'center',
  },
  selectedButtonText: {
    color: "#fff",
  },
});