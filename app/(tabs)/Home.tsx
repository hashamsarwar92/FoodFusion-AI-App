import IntroHeader from "@/components/IntroHeader";
import Colors from "@/services/Colors";
import React from "react";
import { View } from "react-native";

export default function Home() {
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: Colors.WHITE,
        padding: 20,
      }}
    >
      <IntroHeader/>
    </View>
  );
}
