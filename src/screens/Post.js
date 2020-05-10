import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

const firebase = require("firebase");
require("firebase/firestore");

import Fire from "../components/Fire";

import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function Post() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    getPhotoPermissions();
  }, []);

  async function getPhotoPermissions() {
    if (Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status != "granted") {
        Alert.alert("Erro", "Nos precisamos do acessoa sua camera para isso");
      }
    }
  }
  function handlePost() {
    Fire.shared
      .addPost(text.trim(), image)
      .then((response) => {
        setText("");
        setImage(null);

        navigation.goBack();
      })
      .catch((err) => {
        Alert.alert("erro", err);
      });
  }

  async function pickImage() {
    let resul = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!resul.cancelled) {
      setImage(resul.url);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="md-arrow-back" size={34} color="#D8D9DB" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePost()}>
          <Text style={{ fontWeight: "bold" }}>Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContaier}>
        <Image source={require("../../assets/loginLogo.png")} />
        <TextInput
          autoFocus
          multiline
          numberOfLines={4}
          style={{ flex: 1 }}
          placeholder="Deseja compartilhar algo?"
          value={text}
          onChangeText={setText}
        />
      </View>

      <TouchableOpacity style={styles.avatar} onPress={() => pickImage()}>
        <Ionicons name="md-camera" size={32} color="#D8D9D2" />
      </TouchableOpacity>

      <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
  },
  inputContainer: {
    margin: 32,
    flexDirection: "row",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  photo: {
    alignItems: "flex-end",
    marginHorizontal: 32,
  },
});
