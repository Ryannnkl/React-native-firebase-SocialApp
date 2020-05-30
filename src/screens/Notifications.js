import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Notifications() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            "https://img.icons8.com/bubbles/200/000000/appointment-reminders.png",
        }}
        style={{ width: 200, height: 200 }}
      />
      <Text style={styles.title}>Sem notificações por enquanto :)</Text>
      <Text style={styles.sub}>
        Você vera suas notificações inportantes por aqui
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
