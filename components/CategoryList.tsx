import GlobalApi from "@/services/GlobalApi";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CategoryList() {
  const [categoryList, setCategoryList] = React.useState([]);
  useEffect(() => {GetCategoryList()}, []);
  const router = useRouter();

  const GetCategoryList = async () => {
    const result = await GlobalApi.GetCategories();
    setCategoryList(result?.data?.data);
  };
  return (
    <View style={{ marginTop: 15 }}>
      <Text style={styles.heading}>CategoryList</Text>
      <FlatList
        numColumns={4}
        scrollEnabled={false}
        data={categoryList}
        renderItem={({ item, index }: any) => (
          <TouchableOpacity 
          onPress={()=>router.push({
            pathname: '/recipe-by-category',
            params: { categoryName: item?.name },
          })} 
          style={styles.categoryContainer}>
            <Image
              source={{ uri: item?.image?.url }}
              style={{ width: 40, height: 40 }}
            />
            <Text style={{ fontFamily: "outfit", marginTop: 3 }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  categoryContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    marginTop: 8,
  },
});
