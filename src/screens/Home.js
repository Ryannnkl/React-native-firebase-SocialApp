import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
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
    login: "mojombo",
    id: 1,
    node_id: "MDQ6VXNlcjE=",
    avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/mojombo",
    html_url: "https://github.com/mojombo",
    followers_url: "https://api.github.com/users/mojombo/followers",
    following_url:
      "https://api.github.com/users/mojombo/following{/other_user}",
    gists_url: "https://api.github.com/users/mojombo/gists{/gist_id}",
    starred_url: "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/mojombo/subscriptions",
    organizations_url: "https://api.github.com/users/mojombo/orgs",
    repos_url: "https://api.github.com/users/mojombo/repos",
    events_url: "https://api.github.com/users/mojombo/events{/privacy}",
    received_events_url: "https://api.github.com/users/mojombo/received_events",
    type: "User",
    site_admin: false,
  },
  {
    login: "defunkt",
    id: 2,
    node_id: "MDQ6VXNlcjI=",
    avatar_url: "https://avatars0.githubusercontent.com/u/2?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/defunkt",
    html_url: "https://github.com/defunkt",
    followers_url: "https://api.github.com/users/defunkt/followers",
    following_url:
      "https://api.github.com/users/defunkt/following{/other_user}",
    gists_url: "https://api.github.com/users/defunkt/gists{/gist_id}",
    starred_url: "https://api.github.com/users/defunkt/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/defunkt/subscriptions",
    organizations_url: "https://api.github.com/users/defunkt/orgs",
    repos_url: "https://api.github.com/users/defunkt/repos",
    events_url: "https://api.github.com/users/defunkt/events{/privacy}",
    received_events_url: "https://api.github.com/users/defunkt/received_events",
    type: "User",
    site_admin: false,
  },
  {
    login: "pjhyett",
    id: 3,
    node_id: "MDQ6VXNlcjM=",
    avatar_url: "https://avatars0.githubusercontent.com/u/3?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/pjhyett",
    html_url: "https://github.com/pjhyett",
    followers_url: "https://api.github.com/users/pjhyett/followers",
    following_url:
      "https://api.github.com/users/pjhyett/following{/other_user}",
    gists_url: "https://api.github.com/users/pjhyett/gists{/gist_id}",
    starred_url: "https://api.github.com/users/pjhyett/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/pjhyett/subscriptions",
    organizations_url: "https://api.github.com/users/pjhyett/orgs",
    repos_url: "https://api.github.com/users/pjhyett/repos",
    events_url: "https://api.github.com/users/pjhyett/events{/privacy}",
    received_events_url: "https://api.github.com/users/pjhyett/received_events",
    type: "User",
    site_admin: false,
  },
  {
    login: "wycats",
    id: 4,
    node_id: "MDQ6VXNlcjQ=",
    avatar_url: "https://avatars0.githubusercontent.com/u/4?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/wycats",
    html_url: "https://github.com/wycats",
    followers_url: "https://api.github.com/users/wycats/followers",
    following_url: "https://api.github.com/users/wycats/following{/other_user}",
    gists_url: "https://api.github.com/users/wycats/gists{/gist_id}",
    starred_url: "https://api.github.com/users/wycats/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/wycats/subscriptions",
    organizations_url: "https://api.github.com/users/wycats/orgs",
    repos_url: "https://api.github.com/users/wycats/repos",
    events_url: "https://api.github.com/users/wycats/events{/privacy}",
    received_events_url: "https://api.github.com/users/wycats/received_events",
    type: "User",
    site_admin: false,
  },
  {
    login: "ezmobius",
    id: 5,
    node_id: "MDQ6VXNlcjU=",
    avatar_url: "https://avatars0.githubusercontent.com/u/5?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/ezmobius",
    html_url: "https://github.com/ezmobius",
    followers_url: "https://api.github.com/users/ezmobius/followers",
    following_url:
      "https://api.github.com/users/ezmobius/following{/other_user}",
    gists_url: "https://api.github.com/users/ezmobius/gists{/gist_id}",
    starred_url: "https://api.github.com/users/ezmobius/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/ezmobius/subscriptions",
    organizations_url: "https://api.github.com/users/ezmobius/orgs",
    repos_url: "https://api.github.com/users/ezmobius/repos",
    events_url: "https://api.github.com/users/ezmobius/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/ezmobius/received_events",
    type: "User",
    site_admin: false,
  },
  {
    login: "ivey",
    id: 6,
    node_id: "MDQ6VXNlcjY=",
    avatar_url: "https://avatars0.githubusercontent.com/u/6?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/ivey",
    html_url: "https://github.com/ivey",
    followers_url: "https://api.github.com/users/ivey/followers",
    following_url: "https://api.github.com/users/ivey/following{/other_user}",
    gists_url: "https://api.github.com/users/ivey/gists{/gist_id}",
    starred_url: "https://api.github.com/users/ivey/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/ivey/subscriptions",
    organizations_url: "https://api.github.com/users/ivey/orgs",
    repos_url: "https://api.github.com/users/ivey/repos",
    events_url: "https://api.github.com/users/ivey/events{/privacy}",
    received_events_url: "https://api.github.com/users/ivey/received_events",
    type: "User",
    site_admin: false,
  },
  {
    login: "evanphx",
    id: 7,
    node_id: "MDQ6VXNlcjc=",
    avatar_url: "https://avatars0.githubusercontent.com/u/7?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/evanphx",
    html_url: "https://github.com/evanphx",
    followers_url: "https://api.github.com/users/evanphx/followers",
    following_url:
      "https://api.github.com/users/evanphx/following{/other_user}",
    gists_url: "https://api.github.com/users/evanphx/gists{/gist_id}",
    starred_url: "https://api.github.com/users/evanphx/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/evanphx/subscriptions",
    organizations_url: "https://api.github.com/users/evanphx/orgs",
    repos_url: "https://api.github.com/users/evanphx/repos",
    events_url: "https://api.github.com/users/evanphx/events{/privacy}",
    received_events_url: "https://api.github.com/users/evanphx/received_events",
    type: "User",
    site_admin: false,
  },
  {
    login: "vanpelt",
    id: 17,
    node_id: "MDQ6VXNlcjE3",
    avatar_url: "https://avatars1.githubusercontent.com/u/17?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/vanpelt",
    html_url: "https://github.com/vanpelt",
    followers_url: "https://api.github.com/users/vanpelt/followers",
    following_url:
      "https://api.github.com/users/vanpelt/following{/other_user}",
    gists_url: "https://api.github.com/users/vanpelt/gists{/gist_id}",
    starred_url: "https://api.github.com/users/vanpelt/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/vanpelt/subscriptions",
    organizations_url: "https://api.github.com/users/vanpelt/orgs",
    repos_url: "https://api.github.com/users/vanpelt/repos",
    events_url: "https://api.github.com/users/vanpelt/events{/privacy}",
    received_events_url: "https://api.github.com/users/vanpelt/received_events",
    type: "User",
    site_admin: false,
  },
  {
    login: "wayneeseguin",
    id: 18,
    node_id: "MDQ6VXNlcjE4",
    avatar_url: "https://avatars0.githubusercontent.com/u/18?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/wayneeseguin",
    html_url: "https://github.com/wayneeseguin",
    followers_url: "https://api.github.com/users/wayneeseguin/followers",
    following_url:
      "https://api.github.com/users/wayneeseguin/following{/other_user}",
    gists_url: "https://api.github.com/users/wayneeseguin/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/wayneeseguin/starred{/owner}{/repo}",
    subscriptions_url:
      "https://api.github.com/users/wayneeseguin/subscriptions",
    organizations_url: "https://api.github.com/users/wayneeseguin/orgs",
    repos_url: "https://api.github.com/users/wayneeseguin/repos",
    events_url: "https://api.github.com/users/wayneeseguin/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/wayneeseguin/received_events",
    type: "User",
    site_admin: false,
  },
  {
    login: "brynary",
    id: 19,
    node_id: "MDQ6VXNlcjE5",
    avatar_url: "https://avatars0.githubusercontent.com/u/19?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/brynary",
    html_url: "https://github.com/brynary",
    followers_url: "https://api.github.com/users/brynary/followers",
    following_url:
      "https://api.github.com/users/brynary/following{/other_user}",
    gists_url: "https://api.github.com/users/brynary/gists{/gist_id}",
    starred_url: "https://api.github.com/users/brynary/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/brynary/subscriptions",
    organizations_url: "https://api.github.com/users/brynary/orgs",
    repos_url: "https://api.github.com/users/brynary/repos",
    events_url: "https://api.github.com/users/brynary/events{/privacy}",
    received_events_url: "https://api.github.com/users/brynary/received_events",
    type: "User",
    site_admin: false,
  },
  {
    login: "kevinclark",
    id: 20,
    node_id: "MDQ6VXNlcjIw",
    avatar_url: "https://avatars3.githubusercontent.com/u/20?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/kevinclark",
    html_url: "https://github.com/kevinclark",
    followers_url: "https://api.github.com/users/kevinclark/followers",
    following_url:
      "https://api.github.com/users/kevinclark/following{/other_user}",
    gists_url: "https://api.github.com/users/kevinclark/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/kevinclark/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/kevinclark/subscriptions",
    organizations_url: "https://api.github.com/users/kevinclark/orgs",
    repos_url: "https://api.github.com/users/kevinclark/repos",
    events_url: "https://api.github.com/users/kevinclark/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/kevinclark/received_events",
    type: "User",
    site_admin: false,
  },
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

  useEffect(() => {
    console.ignoredYellowBox = true;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Feed</Text>
      </View>

      <FlatList
        style={styles.feed}
        data={posts}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.feedItem}>
            <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
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
                <Ionicons
                  name="ios-heart-empty"
                  size={24}
                  color="#73788B"
                  style={{ marginRight: 16 }}
                />
                <Ionicons
                  name="ios-chatboxes"
                  size={24}
                  color="#73788B"
                  style={{ marginRight: 16 }}
                />
              </View>
            </View>
          </View>
        )}
      />
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
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 20,
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
