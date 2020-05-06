import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import * as firebase from "firebase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  LayoutAnimation.easeInEaseOut();

  useEffect(() => {
    const { email, displayName } = firebase.auth().currentUser;
    setName(displayName);
    setEmail(email);
  }, []);

  function singOutUser() {
    firebase.auth().signOut();
  }

  return (
    <View style={styles.container}>
      <Text>Olá {name}</Text>

      <TouchableOpacity style={{ marginTop: 32 }} onPress={() => singOutUser()}>
        <Text>Sair</Text>
      </TouchableOpacity>
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
