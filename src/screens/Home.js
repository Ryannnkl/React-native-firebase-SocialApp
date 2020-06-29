import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AdMobBanner } from "expo-ads-admob";

import moment from "moment";

import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import * as firebase from "firebase";
import Fire from "../components/Fire";

// "add moment(item.timestamp).fromNow()" in code "item.node_id"
const data = Fire.shared.fakeData;

export default function Home() {
  const [posts, setPosts] = useState(data);
  const [likeIcon, setLikeIcon] = useState("ios-heart-empty");
  const [likeColor, setLikeColor] = useState("#73788B");

  const hidden = false;
  useEffect(() => {
    console.disableYellowBox = true;
  }, []);

  function like(item) {
    if (likeIcon === "ios-heart-empty") {
      setLikeIcon("ios-heart");
      setLikeColor("#ff3612");
    } else {
      setLikeIcon("ios-heart-empty");
      setLikeColor("#73788B");
    }
    item.site_admin = true;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: 35, height: 35 }} />
        <Text style={styles.textHeader}>Feed</Text>
        <TouchableOpacity
          style={{ height: 35, width: 35, borderRadius: 35 / 2 }}
        >
          <Ionicons name="ios-person-add" size={26} color="#333333" />
        </TouchableOpacity>
      </View>
      {hidden ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            style={{ width: 200, height: 200 }}
            source={{
              uri: "https://img.icons8.com/bubbles/200/000000/cancel-2.png",
            }}
          />
          <Text style={{ fontSize: 20, fontWeight: "500", color: "#33333350" }}>
            Estamos sem post para mostrar :(
          </Text>
        </View>
      ) : (
        <FlatList
          style={styles.feed}
          data={posts}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <>
              <View style={styles.feedItem}>
                <Image
                  source={{ uri: item.avatar_url }}
                  style={styles.avatar}
                />
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <Text style={styles.name}>{item.login}</Text>
                      <Text style={styles.timestamp}>{item.node_id}</Text>
                    </View>

                    <Ionicons name="ios-more" size={24} color="#73788B" />
                  </View>

                  <Text style={styles.post}>{item.url}</Text>
                  <Image
                    source={{ uri: item.avatar_url }}
                    resizeMode="cover"
                    style={styles.postImage}
                  />

                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => like(item)}>
                      <Ionicons
                        name={likeIcon}
                        size={24}
                        color={likeColor}
                        style={{ marginRight: 16 }}
                      />
                    </TouchableOpacity>
                    <Ionicons
                      name="ios-chatboxes"
                      size={24}
                      color={"#73788B"}
                      style={{ marginRight: 16 }}
                    />
                  </View>
                </View>
              </View>
              {index % 5 === 0 && (
                <AdMobBanner
                  bannerSize="fullBanner"
                  adUnitID="ca-app-pub-5014682151271774/3295075815"
                  servePersonalizedAds
                />
              )}
            </>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    width: "100%",
    paddingTop: 34,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: {
      height: 5,
    },
    shadowOpacity: 0.5,
    zIndex: 10,
  },
  textHeader: {
    fontSize: 22,
    fontWeight: "bold",
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#454D65",
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899",
  },
  postImage: {
    width: "auto",
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
});
