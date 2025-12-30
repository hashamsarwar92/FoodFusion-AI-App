import Colors from "@/services/Colors";
import GlobalApi from "@/services/GlobalApi";
import React, { useRef } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import Button from "./Button";

export default function CreateRecipe() {
    const [userInput, setUserInput] = React.useState<string>("");
    const [recipeOptions, setRecipeOptions] = React.useState<any>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const actionSheetRef = useRef<ActionSheetRef>(null);
    const OnGenerate = async() => {
      console.log("Generate Recepi Button clicked");
      if(!userInput){
        Alert.alert("Please enter details");
        return;
      }
      console.log("User Input: ", userInput);
      setLoading(true);
      const result = await GlobalApi.AiModelGemini(userInput)
       if (!result.candidates || result.candidates.length === 0) {
    return "No content returned by the model.";
  }
  if (!result.candidates[0].content || !result.candidates[0].content.parts) {
    return "No content parts returned by the model.";
  }
  
      console.log("AI Model Result: ", result.candidates[0].content?.parts[0].text);
    //   const textParts = result?.candidates?.content
    // .map((c: any) => c.text)
    // .join('');
      // const content = result?.choices[0].message?.content;
      // console.log("Recipe Options: ", result?.choices[0].message);
      if(!result.candidates[0].content?.parts[0].text){
        Alert.alert("Failed to generate recipe. Please try again.");
        setLoading(false);
        return;
      }
      setRecipeOptions(JSON.parse(result.candidates[0].content?.parts[0].text));
     
      setLoading(false);
       actionSheetRef.current?.show();
    };
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
      <Button label="Generate Recipe" loading={loading}
      icon={"sparkles"} onPress={() => OnGenerate()} />
      <ActionSheet gestureEnabled ref={actionSheetRef}>
      <View style={styles.actionSheetContainer}>
        <Text style={styles.heading}>Select Recipe</Text>
        <View>
          {
            recipeOptions?.map((item: any, index: any)=>(
              <View key={index} style={styles.recipeOptionContainer}>
                <Text style={{
                  fontFamily: "outfit-bold",
                  fontSize: 16,
                }}>{item?.recipeName}</Text>
                <Text style={{
                  fontFamily: "outfit",
                  color: Colors.GRAY,
                }}>{item?.description}</Text>
              </View>
            ))
          }
        </View>
      </View>
    </ActionSheet>
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
  actionSheetContainer: {
    padding: 25,
  },
  recipeOptionContainer: {
    padding: 15,
    borderWidth: 0.2,
    borderRadius: 15,
    marginTop: 15,
  },
});
