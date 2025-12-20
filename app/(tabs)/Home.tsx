import CreateRecipe from "@/components/CreateRecipe";
import IntroHeader from "@/components/IntroHeader";
import Colors from "@/services/Colors";
import React from "react";
import { ScrollView } from "react-native";

export default function Home() {
  return (
    <ScrollView
      style={{
        height: "100%",
        backgroundColor: Colors.WHITE,
        padding: 20,
      }}
    >
      <IntroHeader/>
      <CreateRecipe/>
    </ScrollView>
  );
}
