import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomePage } from "../screens/HomePage";
import { Profile } from "../screens/Profile";
import { CreateEvent } from "../screens/CreateEvent";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";
import UserMap from "../screens/UserMap";

const Tab = createBottomTabNavigator();

export const TabBottom = ({ navigation, route }) => {
  const [role, setRole] = useState("");

  useEffect(() => {
    checkRole();
  }, []);
  const checkRole = async () => {
    const role = await SecureStore.getItemAsync("userRole");
    // console.log(role, "????????");
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Create") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#5E17EB",
        tabBarInactiveTintColor: "#dcdde1",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomePage}
      />
      {role === "owner" ? (
        <Tab.Screen
          name="Create"
          options={{ headerShown: false }}
          component={CreateEvent}
        />
      ) : (
        <Tab.Screen
          name="Map"
          options={{ headerShown: false }}
          component={UserMap}
        />
      )}

      <Tab.Screen
        name="Profile"
        options={{ headerShown: false }}
        component={Profile}
      />
    </Tab.Navigator>
  );
};
