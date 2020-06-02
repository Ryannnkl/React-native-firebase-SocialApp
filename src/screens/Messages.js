import React, { useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import GoBack from "../components/goBackButton";

const data = [
  {
    id: "e21",
    name: "Julio",
    last: "Oi",
    avatar: "https://avatars0.githubusercontent.com/u/1?v=4",
  },
  {
    id: "e22",
    name: "Alisson",
    last: "Como ta indo?",
    avatar: "https://avatars0.githubusercontent.com/u/3?v=4",
  },
];

export default function Messages() {
  const [chats, setChats] = useState(data);

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        style={{ width: "100%", height: "100%" }}
        ListHeaderComponent={
          <View style={styles.header}>
            <GoBack />
            <Text style={styles.textHeader}>Menssagens</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.contentChat}>
            <View style={styles.contentChatUser}>
              <Image style={styles.avatarImage} source={{ uri: item.avatar }} />
              <View style={{ flex: 1, alignItems: "flex-start" }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text>{item.last}</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  contentChat: {
    flex: 1,
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  contentChatUser: {
    width: "100%",
    height: 75,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  header: {
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  textHeader: {
    fontSize: 22,
    fontWeight: "bold",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
