import React, { useState } from "react";
import { View, FlatList, StyleSheet, Image, Text } from "react-native";

import Header from "../components/Header";

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

const screens = () => {
  const [users, setUsers] = useState(data);

  return (
    <View>
      <Header text="Contatos" />
      <FlatList
        data={users}
        showsVerticalScrollIndicator
        renderItem={({ item }) => (
          <View style={styles.content}>
            <Image style={styles.photo} source={{ uri: item.avatar_url }} />
            <Text style={styles.name}>{item.login}</Text>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    width: "100%",
    height: 75,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginHorizontal: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
});

export default screens;
