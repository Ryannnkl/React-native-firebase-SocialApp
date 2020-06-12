import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import {
  View,
  Text,
  Alert,
  Image,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import getAvatarUrl from "../utils/getImageAdorable";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function handleSignUp() {
    const avatarUrl = getAvatarUrl();
    setLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        firebase
          .firestore()
          .collection("users")
          .doc(userCredentials.user.uid)
          .set({
            posts: 0,
            followers: 0,
            following: 0,
            name: name,
            photoURL: avatarUrl,
          })
          .then(() => {
            userCredentials.user.updateProfile({
              displayName: name,
              photoURL: avatarUrl,
            });
            setLoading(false);
            navigation.navigate("AppTab", { screen: "Home" });
          });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/authHeader.png")}
        style={{
          position: "absolute",
          top: -100,
          right: -150,
          width: 500,
          height: 320,
        }}
      />
      <View
        style={{
          width: "100%",
          height: "auto",
        }}
      >
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="ios-arrow-round-back" size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.greeting}>{`Olá !\nCadastre-se para iniciar`}</Text>

        <Text>{error && <Text>{error}</Text>}</Text>
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Nome</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="words"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Senha</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        <TouchableOpacity onPress={() => handleSignUp()} style={styles.button}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={{ color: "#FFF", fontWeight: "500" }}>Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }}>
          <Text style={{ color: "#414959", fontSize: 13 }}>
            Ja tem uma conta?{" "}
            <Text
              onPress={() => navigation.navigate("login")}
              style={{ fontWeight: "500", color: "#E9446A" }}
            >
              Login
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require("../../assets/authHeader.png")}
        style={{
          position: "absolute",
          bottom: -200,
          right: -50,
          opacity: 0.4,
          width: 500,
          height: 320,
          zIndex: -5,
        }}
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
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "#E9446A",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  form: {
    marginBottom: 40,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  back: {
    position: "absolute",
    top: 48,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(21,22,48,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
});
