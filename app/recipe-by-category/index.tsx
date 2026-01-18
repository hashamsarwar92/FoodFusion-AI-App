import RecipeCard from "@/components/RecipeCard";
import Colors from "@/services/Colors";
import GlobalApi from "@/services/GlobalApi";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function RecipeByCategory() {
  const { categoryName } = useLocalSearchParams();
  const [recipeList, setRecipeList] = useState();
  useEffect(() => {
    GetRecipeListByCategory();
  }, []);
  const GetRecipeListByCategory = async () => {
    const result = await GlobalApi.GetRecipeByCategory(categoryName as string);
    console.log("Recipes by Category: ", result.data.data);
    setRecipeList(result?.data?.data);
  };
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 100,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
        }}
      >
        Browse {categoryName} Recipes
      </Text>

      <FlatList
        numColumns={2}
        data={recipeList}
        renderItem={({ item, index }) => (
          <View style={{ flex: 1 }} key={index}>
            <RecipeCard recipe={item} />
          </View>
        )}
      />
    </View>
  );
}
