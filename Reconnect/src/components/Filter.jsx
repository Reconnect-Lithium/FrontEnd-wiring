import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

export const Filter = ({ onSelectFilter }) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search Event..."
                value={searchTerm}
                onChangeText={text => setSearchTerm(text)}
                onSubmitEditing={() => onSelectFilter(searchTerm)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
    },
    searchBar: {
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});