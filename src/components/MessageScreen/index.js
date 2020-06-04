import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Alert,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

import Header from "../Header";
import Fire from "../Fire";

export default function Message({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const data = route.params.data;

  function user() {
    return {
      _id: Fire.shared.uid,
      name: Fire.shared.userName,
      avatar: "https://api.adorable.io/avatars/78",
    };
  }

  function sendMessage(text) {
    const temp = GiftedChat.append(messages, text);
    setMessages(temp);
  }

  function chat() {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        enabled={false}
      >
        <Header
          text={data.name}
          color="#E9446A"
          textColor="#FFF"
          arrowColor="#FFF"
        />
        <GiftedChat
          placeholder="Digite aqui..."
          messages={messages}
          user={user()}
          onSend={(text) => sendMessage(text)}
          showAvatarForEveryMessage
          renderUsernameOnMessage
          alwaysShowSend
          scrollToBottom
          showUserAvatar
          inverted={false}
        />
      </KeyboardAvoidingView>
    );
  }

  return <SafeAreaView style={{ flex: 1 }}>{chat()}</SafeAreaView>;
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    backgroundColor: "#E9446A",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "500",
  },
});
