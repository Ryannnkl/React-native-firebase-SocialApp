import React, { useState, useEffect } from "react";
import {
  Text,
  Alert,
  Button,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { FontAwesome5 } from "@expo/vector-icons";
import Fire from "../Fire";

export default function Message({ navigation }) {
  const [messages, setMessages] = useState([]);

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
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            height: 35,
            width: 35,
            borderRadius: 35 / 2,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 5,
          }}
          onPress={() => navigation.navigate("AppTab", { screen: "Home" })}
        >
          <FontAwesome5 name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
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
