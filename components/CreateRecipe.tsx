import Colors from "@/services/Colors";
import React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "./Button";

export default function CreateRecipe() {
    const [userInput, setUserInput] = React.useState<string>("");
  return (
    <View style={styles.container}>
      <Image
        source={require("./../assets/images/pan.gif")}
        style={styles.panImage}
      />
      <Text style={styles.heading}>Warm up your stove and let get cooking</Text>
      <Text style={styles.subHeading}>Make something for you</Text>
      <TextInput
        multiline={true}
        onChangeText={(value)=>setUserInput(value)}
        numberOfLines={3}
        style={styles.textInput}
        placeholderTextColor={Colors.GRAY} 
        placeholder="What you want to create? Add ingredients etc"
      />
      <Button label="Generate Recipe"
      icon={"sparkles"} onPress={() => {console.log("Generate Recipe pressed")}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 15,
    backgroundColor: Colors.SECONDARY,
    borderRadius: 25,
    display: "flex",
    alignItems: "center",
  },
  panImage: {
    width: 80,
    height: 80,
  },
  heading: {
    fontFamily: "outfit",
    fontSize: 23,
    textAlign: "center",
  },
  subHeading: {
    fontFamily: "outfit",
    fontSize: 16,
    marginTop: 6,
  },
  textInput: {
    backgroundColor: Colors.WHITE,
    width: "100%",
    borderRadius: 15,
    height: 120,
    marginTop: 8,
    padding: 15,
    textAlignVertical: "top",
    fontSize: 16,
  },
});
