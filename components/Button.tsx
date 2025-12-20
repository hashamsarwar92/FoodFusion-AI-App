import Colors from "@/services/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function Button({ label, onPress, icon='' }: any) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        borderRadius: 15,
        marginTop: 20,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
      onPress={onPress}
    >
      <Ionicons name={icon} size={24} color={Colors.WHITE} />
      <Text
        style={{
          textAlign: "center",
          color: Colors.WHITE,
          fontFamily: "outfit",
          fontSize: 17,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
