import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Text, View } from "react-native";

export default function RecipeCard({ recipe }: any) {
  return (
    <View style={{ margin: 5 }}>
      <Image
        source={{ uri: recipe?.recipeImage }}
        style={{
          width: "100%",
          height: 220,
          borderRadius: 20,
        }}
      />
      <LinearGradient colors={["rgba(0,0,0,0.8)", "transparent"]}>
        <View style={{ position: "absolute" }}>
          <Text>{recipe?.recipeName}</Text>
        </View>
      </LinearGradient>
    </View>
  );
}
