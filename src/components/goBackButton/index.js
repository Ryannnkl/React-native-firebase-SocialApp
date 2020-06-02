import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function goBack({ color }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        top: 30,
        left: 10,
        zIndex: 10,
      }}
      onPress={() => navigation.goBack()}
    >
      <FontAwesome5
        name="arrow-left"
        size={24}
        color={color ? color : "#333"}
      />
    </TouchableOpacity>
  );
}
