import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";

import AppTab from "./components/tab";

import Login from "./screens/Login";
import Loading from "./screens/Loading";
import Register from "./screens/Register";
import Post from "./screens/Post";
import Contacts from "./screens/Contacts";

import Message from "./components/MessageScreen";

const firebaseConfig = require("./config/firebaseConfig");

const Stack = createStackNavigator();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
function AuthStack() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="login">
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" mode="modal">
        <Stack.Screen name="loading" component={Loading} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="AppTab" component={AppTab} />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="Message" component={Message} />
        <Stack.Screen name="Contacts" component={Contacts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
