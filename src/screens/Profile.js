import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Image, Text } from "react-native";
import * as firebase from "firebase";

import Fire from "../components/Fire";

export default function Profile({ uid }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = uid || Fire.shared.uid;

    const unsubscribe = Fire.shared.firestore
      .collection("users")
      .doc(user)
      .onSnapshot((doc) => {
        setUser(doc.data());
      });

    return unsubscribe();
  }, []);

  function exitAcont() {
    Fire.singOut();
  }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 32, alignItems: "center" }}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={
              user.avatar
                ? { uri: user.avatar }
                : { uri: "https://api.adorable.io/avatars/1" }
            }
          />
        </View>
        <Text style={styles.name}>{user.name}</Text>
      </View>
      <View style={styles.statusContainer}>
        <View style={styles.status}>
          <Text style={styles.statAmount}>21</Text>
          <Text style={styles.statTitle}>posts</Text>
        </View>
        <View style={styles.status}>
          <Text style={styles.statAmount}>983</Text>
          <Text style={styles.statTitle}>seguidores</Text>
        </View>
        <View style={styles.status}>
          <Text style={styles.statAmount}>456</Text>
          <Text style={styles.statTitle}>seguindo</Text>
        </View>
      </View>
      <Button title="sair" onPress={() => exitAcont()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  avatarContainer: {
    shadowColor: "#151734",
    shadowRadius: 15,
    shadowOpacity: 0.5,
  },
  avatar: {
    width: 136,
    height: 136,
    borderRadius: 136 / 2,
  },
  name: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 32,
  },
  status: {
    alignItems: "center",
    flex: 1,
  },
  statAmount: {
    color: "#4F566D",
    fontSize: 18,
    fontWeight: "300",
  },
  statTitle: {
    color: "#C3c5cd",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
  },
});
