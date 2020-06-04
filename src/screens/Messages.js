import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Header from "../components/Header";

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

export default function Messages({ navigation }) {
  const [chats, setChats] = useState(data);

  return (
    <View style={styles.container}>
      <Header text="Menssagens" />

      {true ? (
        <>
          <FlatList
            data={chats}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            style={{ width: "100%", height: "100%" }}
            renderItem={({ item }) => (
              <View style={styles.contentChat}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Message", { data: item })}
                  style={styles.contentChatUser}
                >
                  <Image
                    style={styles.avatarImage}
                    source={{ uri: item.avatar }}
                  />
                  <View style={{ flex: 1, alignItems: "flex-start" }}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={{ color: "#777" }}>{item.last}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => navigation.navigate("Contacts")}
          >
            <FontAwesome5 name="users" size={30} color="#FFF" />
          </TouchableOpacity>
        </>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            style={{ width: 200, height: 200 }}
            source={{
              uri: "https://img.icons8.com/bubbles/200/000000/myspace.png",
            }}
          />
          <Text style={styles.title}>Sem novas menssagens :(</Text>
          <Text style={styles.sub}>
            Adicione novos amigos para bater um papo legal!
          </Text>
        </View>
      )}
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
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  header: {
    width: "100%",
    paddingTop: 34,
    paddingBottom: 16,
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
  chatButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
    backgroundColor: "#123178",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  sub: {
    fontWeight: "400",
    color: "#37373750",
  },
});
