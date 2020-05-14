import React from "react";
import { View, StyleSheet, Button } from "react-native";
import * as firebase from "firebase";

export default function Profile() {
  function exitAcont() {
    firebase.auth().signOut();
  }
  return (
    <View style={styles.container}>
      <Button title="sair" onPress={() => exitAcont()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
