import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "../../screens/Home";
import Post from "../../screens/Post";
import Profile from "../../screens/Profile";
import Messages from "../../screens/Messages";
import Notifications from "../../screens/Notifications";

const Tab = createBottomTabNavigator();

export default function AppTab() {
  return (
    <Tab.Navigator
      options={({ route }) => ({
        tabBarIcon: {
          focused: true,
        },
        showLabel: false,
      })}
      tabBarOptions={{
        activeTintColor: "#e91e63",
      }}
      initialRouteName="home"
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-chatboxes" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-add-circle" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-notifications" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-person" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
