import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import {
  View,
  Text,
  Image,
  TextInput,
  StatusBar,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function handleLogin() {
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function () {
        setLoading(false);
        navigation.navigate("AppTab", { screen: "home" });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }

  LayoutAnimation.easeInEaseOut();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <View style={{ width: "100%", height: "auto" }}>
        <Image
          source={require("../../assets/authHeader.png")}
          style={styles.imageHeaer}
        />

        <Image
          source={require("../../assets/loginLogo.png")}
          style={{ alignSelf: "center", marginTop: 44 }}
        />

        <Text
          style={styles.greeting}
        >{`Olá de novo.\nBem vindo de volta`}</Text>

        <View style={styles.errorMessage}>
          {error && <Text style={styles.error}>{error}</Text>}
        </View>

        <View style={styles.form}>
          <View>
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

        <TouchableOpacity onPress={() => handleLogin()} style={styles.button}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={{ color: "#FFF", fontWeight: "500" }}>Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }}>
          <Text style={{ color: "#414959", fontSize: 13 }}>
            Novo aqui?{" "}
            <Text
              onPress={() => navigation.navigate("register")}
              style={{ fontWeight: "500", color: "#E9446A" }}
            >
              cadastre
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require("../../assets/authHeader.png")}
        style={styles.imageFooter}
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
  imageHeaer: {
    position: "absolute",
    width: 520,
    height: 349,
    top: -140,
    right: -150,
  },
  imageFooter: {
    position: "absolute",
    opacity: 0.4,
    width: 500,
    height: 340,
    bottom: -220,
    zIndex: -5,
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    zIndex: 5,
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
});
