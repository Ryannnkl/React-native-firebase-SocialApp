import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as firebase from "firebase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const { email, displayName } = firebase.auth().currentUser;
    setName(displayName);
    setEmail(email);
  }, []);

  function singOutUser() {
    firebase.auth().singOutUser();
  }

  return (
    <View>
      <Text>Olá {name}</Text>

      <TouchableOpacity style={{ marginTop: 32 }} onPress={() => singoutUser()}>
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
