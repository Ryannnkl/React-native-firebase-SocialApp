import React from "react";
import { View, Text, StyleSheet } from "react-native";

import GoBack from "../goBackButton";

export default function Header(props) {
  const {
    text = "teste",
    color = "#FFF",
    textColor = "#333",
    arrowColor = "#333",
  } = props;

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GoBack float={false} color={arrowColor} />
      <Text style={[styles.title, { color: textColor }]}>{text}</Text>
      <View style={{ width: 35, height: 35 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 80,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
