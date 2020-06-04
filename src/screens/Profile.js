import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AdMobInterstitial, AdMobRewarded } from "expo-ads-admob";
import { FontAwesome5 } from "@expo/vector-icons";
import getImage from "../utils/getImageAdorable";

import * as firebase from "firebase";

import Fire from "../components/Fire";

export default function Profile({ uid }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(getImage());

  async function test() {
    await AdMobRewarded.setAdUnitID("ca-app-pub-5014682151271774/8339379314");
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
  }

  useEffect(() => {
    console.disableYellowBox = true;
    const user = uid || Fire.shared.uid;

    const unsubscribe = Fire.shared.firestore
      .collection("users")
      .doc(user)
      .onSnapshot((doc) => {
        setUser(doc.data());
      });

    return unsubscribe();
  }, []);

  async function refreshAvatar() {
    if (loading) {
      return setLoading(false);
    }
    setLoading(true);
    await test();
    setLoading(false);
    setAvatarUrl(getImage());
  }

  async function getData() {
    const db = firebase.firestore();
    db.collection("posts")
      .get()
      .then((response) => {
        console.log(response);
      });
  }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 32, alignItems: "center" }}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={{ uri: avatarUrl }} />

          <TouchableOpacity
            style={styles.tradeIcon}
            onPress={() => refreshAvatar()}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <FontAwesome5 name="exchange-alt" size={24} color="#FFF" />
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>Name: {user.name}</Text>
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
      <Button title="teste" onPress={() => getData()} />
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
    borderWidth: 4,
    borderRadius: 136 / 2,
    borderColor: "#37373799",
  },
  avatar: {
    width: 136,
    height: 136,
    borderRadius: 136 / 2,
  },
  tradeIcon: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: "#4278ff",
    alignItems: "center",
    justifyContent: "center",
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
