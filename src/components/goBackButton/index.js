import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function goBack({ color = "#333", float }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.container, float ? styles.pos : {}]}
      onPress={() => navigation.goBack()}
    >
      <FontAwesome5 name="arrow-left" size={24} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
  },
  pos: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
  },
});
