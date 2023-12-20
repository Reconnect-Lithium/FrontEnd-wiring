import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ProfileUser } from "../screens/ProfileUser";
import UserMap from "../screens/UserMap";
import { HomePage } from "../screens/HomePage";

const Tab = createBottomTabNavigator();

export const TabBottomUser = ({ navigation, route }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomePage") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Map") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#5E17EB",
        tabBarInactiveTintColor: "#5E17EB",
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
        name="HomePage"
        options={{ headerShown: false }}
        component={HomePage}
      />
      <Tab.Screen
        name="Map"
        options={{ headerShown: false }}
        component={UserMap}
      />
      <Tab.Screen
        name="Profile"
        options={{ headerShown: false }}
        component={ProfileUser}
      />
    </Tab.Navigator>
  );
};
