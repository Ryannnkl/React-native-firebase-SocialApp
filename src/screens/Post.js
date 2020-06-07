import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

import "firebase/firestore";

import Fire from "../components/Fire";

import {
  View,
  Text,
  Alert,
  Image,
  Button,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

export default function Post() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(
    "https://img.icons8.com/material-outlined/24/000000/user--v1.png"
  );

  const navigation = useNavigation();

  useEffect(() => {
    getPhotoPermissions();
    setPhotoUrl(Fire.shared.userData.photoURL);
  }, []);

  async function getPhotoPermissions() {
    if (Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status != "granted") {
        Alert.alert("Erro", "Nos precisamos do acessoa sua camera para isso");
      }
    }
  }

  async function handlePost() {
    const data = {
      text: text.trim(),
      localUri: image,
      likes: 0,
      comments: [],
    };

    return Fire.shared
      .addPost(data)
      .then(() => {
        setText("");
        setImage(null);
        navigation.goBack();
      })
      .catch((err) => {
        Alert.alert("erro", JSON.stringify(err));
      });
  }

  async function pickImage() {
    const resul = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!resul.cancelled) {
      setImage(resul.uri);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ alignSelf: "flex-start" }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="md-arrow-back" size={34} color="#D8D9DB" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignSelf: "center" }}
          onPress={() => handlePost()}
        >
          <Text style={{ fontWeight: "bold", fontSize: 22 }}>Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Image
          style={{ height: 70, width: 70, borderRadius: 70 / 2 }}
          source={{
            uri: photoUrl,
          }}
        />
        <TextInput
          autoFocus
          placeholder="Deseja compartilhar algo?"
          value={text}
          onChangeText={setText}
          style={{ paddingHorizontal: 10 }}
        />
      </View>

      <TouchableOpacity style={styles.avatar} onPress={() => pickImage()}>
        <Ionicons name="md-camera" size={32} color="#D8D9D2" />
      </TouchableOpacity>

      <View
        style={{
          marginHorizontal: 32,
          marginTop: 32,
          height: 300,
          width: "90%",
        }}
      >
        <Image
          source={{ uri: image }}
          fadeDuration={1000}
          style={{ flex: 1 }}
        />
      </View>
      <Button title="teste" onPress={() => Alert.alert("teste", image)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
  },
  inputContainer: {
    margin: 20,
    flexDirection: "row",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  photo: {
    alignItems: "flex-end",
    marginHorizontal: 32,
  },
});
