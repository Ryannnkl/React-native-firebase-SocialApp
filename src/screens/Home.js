import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  AdMobBanner,
  PublisherBanner,
  setTestDeviceIDAsync,
} from "expo-ads-admob";
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

// "add moment(item.timestamp).fromNow()" in code "item.node_id"

const data = [
  {
    login: "technoweenie",
    id: 21,
    node_id: "MDQ6VXNlcjIx",
    avatar_url: "https://avatars3.githubusercontent.com/u/21?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/technoweenie",
    html_url: "https://github.com/technoweenie",
    followers_url: "https://api.github.com/users/technoweenie/followers",
    following_url:
      "https://api.github.com/users/technoweenie/following{/other_user}",
    gists_url: "https://api.github.com/users/technoweenie/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/technoweenie/starred{/owner}{/repo}",
    subscriptions_url:
      "https://api.github.com/users/technoweenie/subscriptions",
    organizations_url: "https://api.github.com/users/technoweenie/orgs",
    repos_url: "https://api.github.com/users/technoweenie/repos",
    events_url: "https://api.github.com/users/technoweenie/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/technoweenie/received_events",
    type: "User",
    site_admin: false,
  },
  {
    login: "macournoyer",
    id: 22,
    node_id: "MDQ6VXNlcjIy",
    avatar_url: "https://avatars3.githubusercontent.com/u/22?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/macournoyer",
    html_url: "https://github.com/macournoyer",
    followers_url: "https://api.github.com/users/macournoyer/followers",
    following_url:
      "https://api.github.com/users/macournoyer/following{/other_user}",
    gists_url: "https://api.github.com/users/macournoyer/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/macournoyer/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/macournoyer/subscriptions",
    organizations_url: "https://api.github.com/users/macournoyer/orgs",
    repos_url: "https://api.github.com/users/macournoyer/repos",
    events_url: "https://api.github.com/users/macournoyer/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/macournoyer/received_events",
    type: "User",
    site_admin: false,
  },
  {
    login: "takeo",
    id: 23,
    node_id: "MDQ6VXNlcjIz",
    avatar_url: "https://avatars3.githubusercontent.com/u/23?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/takeo",
    html_url: "https://github.com/takeo",
    followers_url: "https://api.github.com/users/takeo/followers",
    following_url: "https://api.github.com/users/takeo/following{/other_user}",
    gists_url: "https://api.github.com/users/takeo/gists{/gist_id}",
    starred_url: "https://api.github.com/users/takeo/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/takeo/subscriptions",
    organizations_url: "https://api.github.com/users/takeo/orgs",
    repos_url: "https://api.github.com/users/takeo/repos",
    events_url: "https://api.github.com/users/takeo/events{/privacy}",
    received_events_url: "https://api.github.com/users/takeo/received_events",
    type: "User",
    site_admin: false,
  },
  {
    login: "caged",
    id: 25,
    node_id: "MDQ6VXNlcjI1",
    avatar_url: "https://avatars3.githubusercontent.com/u/25?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/caged",
    html_url: "https://github.com/caged",
    followers_url: "https://api.github.com/users/caged/followers",
    following_url: "https://api.github.com/users/caged/following{/other_user}",
    gists_url: "https://api.github.com/users/caged/gists{/gist_id}",
    starred_url: "https://api.github.com/users/caged/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/caged/subscriptions",
    organizations_url: "https://api.github.com/users/caged/orgs",
    repos_url: "https://api.github.com/users/caged/repos",
    events_url: "https://api.github.com/users/caged/events{/privacy}",
    received_events_url: "https://api.github.com/users/caged/received_events",
    type: "User",
    site_admin: false,
  },
  {
    login: "topfunky",
    id: 26,
    node_id: "MDQ6VXNlcjI2",
    avatar_url: "https://avatars3.githubusercontent.com/u/26?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/topfunky",
    html_url: "https://github.com/topfunky",
    followers_url: "https://api.github.com/users/topfunky/followers",
    following_url:
      "https://api.github.com/users/topfunky/following{/other_user}",
    gists_url: "https://api.github.com/users/topfunky/gists{/gist_id}",
    starred_url: "https://api.github.com/users/topfunky/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/topfunky/subscriptions",
    organizations_url: "https://api.github.com/users/topfunky/orgs",
    repos_url: "https://api.github.com/users/topfunky/repos",
    events_url: "https://api.github.com/users/topfunky/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/topfunky/received_events",
    type: "User",
    site_admin: false,
  },
  {
    login: "anotherjesse",
    id: 27,
    node_id: "MDQ6VXNlcjI3",
    avatar_url: "https://avatars3.githubusercontent.com/u/27?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/anotherjesse",
    html_url: "https://github.com/anotherjesse",
    followers_url: "https://api.github.com/users/anotherjesse/followers",
    following_url:
      "https://api.github.com/users/anotherjesse/following{/other_user}",
    gists_url: "https://api.github.com/users/anotherjesse/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/anotherjesse/starred{/owner}{/repo}",
    subscriptions_url:
      "https://api.github.com/users/anotherjesse/subscriptions",
    organizations_url: "https://api.github.com/users/anotherjesse/orgs",
    repos_url: "https://api.github.com/users/anotherjesse/repos",
    events_url: "https://api.github.com/users/anotherjesse/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/anotherjesse/received_events",
    type: "User",
    site_admin: false,
  },
  {
    login: "roland",
    id: 28,
    node_id: "MDQ6VXNlcjI4",
    avatar_url: "https://avatars2.githubusercontent.com/u/28?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/roland",
    html_url: "https://github.com/roland",
    followers_url: "https://api.github.com/users/roland/followers",
    following_url: "https://api.github.com/users/roland/following{/other_user}",
    gists_url: "https://api.github.com/users/roland/gists{/gist_id}",
    starred_url: "https://api.github.com/users/roland/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/roland/subscriptions",
    organizations_url: "https://api.github.com/users/roland/orgs",
    repos_url: "https://api.github.com/users/roland/repos",
    events_url: "https://api.github.com/users/roland/events{/privacy}",
    received_events_url: "https://api.github.com/users/roland/received_events",
    type: "User",
    site_admin: false,
  },
  {
    login: "lukas",
    id: 29,
    node_id: "MDQ6VXNlcjI5",
    avatar_url: "https://avatars2.githubusercontent.com/u/29?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/lukas",
    html_url: "https://github.com/lukas",
    followers_url: "https://api.github.com/users/lukas/followers",
    following_url: "https://api.github.com/users/lukas/following{/other_user}",
    gists_url: "https://api.github.com/users/lukas/gists{/gist_id}",
    starred_url: "https://api.github.com/users/lukas/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/lukas/subscriptions",
    organizations_url: "https://api.github.com/users/lukas/orgs",
    repos_url: "https://api.github.com/users/lukas/repos",
    events_url: "https://api.github.com/users/lukas/events{/privacy}",
    received_events_url: "https://api.github.com/users/lukas/received_events",
    type: "User",
    site_admin: false,
  },
];

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
          ListHeaderComponent={() => (
            <AdMobBanner
              bannerSize="fullBanner"
              adUnitID="ca-app-pub-5014682151271774/2678228210"
              servePersonalizedAds
              onDidFailToReceiveAdWithError={(err) => console.log(err)}
            />
          )}
          renderItem={({ item }) => (
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
