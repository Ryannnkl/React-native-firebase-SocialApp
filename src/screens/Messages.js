import React, { useState, useEffect } from "react";
import {
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  Button,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Fire from "../components/Fire";

export default function Message(props) {
  const [messages, setMessages] = useState([]);

  function user() {
    return {
      _id: Fire.shared.uid,
      name: Fire.shared.userName,
    };
  }

  useEffect(() => {
    Fire.shared.get((message) => {
      setMessages((prevState) => GiftedChat.append(prevState));
    });
    return Fire.shared.off();
  }, []);

  if (Platform.OS === "android") {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={30}
        enabled
      >
        <GiftedChat
          messages={messages}
          onSend={Fire.shared.sendMessage}
          user={user()}
        />
      </KeyboardAvoidingView>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button title="teste" onPress={() => Alert.alert("teste", messages)} />
      <GiftedChat
        messages={messages}
        onSend={Fire.shared.sendMessage}
        user={user()}
      />
    </SafeAreaView>
  );
}
