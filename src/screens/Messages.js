import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Fire from "../components/Fire";

export default function Message({ navigation }) {
  const [messages, setMessages] = useState([]);

  function user() {
    return {
      _id: Fire.shared.uid,
      name: Fire.shared.userName,
      avatar: "https://api.adorable.io/avatars/45",
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
        <Button title="limpar" onPress={() => setMessages([])} />
        <GiftedChat
          placeholder="Digite aqui..."
          messages={messages}
          user={user()}
          onSend={(text) => sendMessage(text)}
          showAvatarForEveryMessage
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
