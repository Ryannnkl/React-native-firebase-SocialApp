import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";

import Fire from "../components/Fire";

export default function Loading() {
  const navigation = useNavigation();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      navigation.navigate(user ? "AppTab" : "AuthStack");
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Só um momento ...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
