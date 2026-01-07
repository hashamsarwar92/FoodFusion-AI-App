import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function RecipeByCategory() {
    const {categoryName} = useLocalSearchParams();
  return (
    <View>
      <Text>RecipeByCategory {categoryName}</Text>
    </View>
  )
}