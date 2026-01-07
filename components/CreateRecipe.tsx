import { UserContext } from "@/context/UserContext";
import Colors from "@/services/Colors";
import dummyData from "@/services/dummyData";
import GlobalApi from "@/services/GlobalApi";
import Prompt from "@/services/Prompt";
import React, { useContext, useEffect, useRef } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import Button from "./Button";
import LoadingDialog from "./LoadingDialog";

export default function CreateRecipe() {
  const [userInput, setUserInput] = React.useState<string>("");
  const [recipeOptions, setRecipeOptions] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [openLoading, setOpenLoading] = React.useState<boolean>(false);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { user, setUser } = useContext(UserContext);
  const [offline, setOffline] = React.useState<boolean>(true);
  useEffect(() => {
    console.log("User Context in CreateRecipe: ", user);
  }, [user]);

  const OnGenerate = async () => {
    console.log("Generate Recepi Button clicked");
    if (!userInput) {
      Alert.alert("Please enter details");
      return;
    }
    console.log("User Input: ", userInput);
    setLoading(true);

    let recipeOptions = "";
    if (offline) {
      recipeOptions = JSON.stringify(dummyData.dummyRecipes);
    } else {
      const result = await GlobalApi.AiModelGemini(`
          Based on the user instruction, create exactly 3 different recipe variants.
          Requirements:
          1. Each recipe must have:
            - "recipeName": include an emoji
            - "description": 2-line description
            - "ingredients": main ingredient list (no quantities or sizes)
          2. Return the output **only in JSON format** with these fields: recipeName, description, ingredients
          3. Do not include any extra text outside JSON
          4. Use creative recipe names and descriptions
          User Instruction: "${userInput}"`);
      if (!result.candidates || result.candidates.length === 0) {
        return "No content returned by the model.";
      }
      if (
        !result.candidates[0].content ||
        !result.candidates[0].content.parts
      ) {
        return "No content parts returned by the model.";
      }
      if (!result.candidates[0].content?.parts[0].text) {
        Alert.alert("Failed to generate recipe. Please try again.");
        setLoading(false);
        return;
      }
      console.log(
        "Recipe Options: ",
        result.candidates[0].content?.parts[0].text
      );
      recipeOptions = result.candidates[0].content?.parts[0].text;
    }

    setRecipeOptions(JSON.parse(recipeOptions));
    setLoading(false);
    actionSheetRef.current?.show();
  };

  const GenerateCompleteRecipe = async (option: any) => {
    setOpenLoading(true);

    actionSheetRef.current?.hide();
    let completeRecipe = "";
    if (offline) {
      completeRecipe = JSON.stringify(dummyData.dummyRecipeContent);
    } else {
      const PROMPT = Prompt.GENERATE_COMPLETE_RECIPE_PROMPT({
        recipeName: option?.recipeName,
        description: option?.description,
      });
      const result = await GlobalApi.AiModelGemini(PROMPT);
      if (!result.candidates || result.candidates.length === 0) {
        return "No content returned by the model.";
      }
      if (
        !result.candidates[0].content ||
        !result.candidates[0].content.parts
      ) {
        return "No content parts returned by the model.";
      }
      if (!result.candidates[0].content?.parts[0].text) {
        Alert.alert("Failed to generate recipe. Please try again.");
        setLoading(false);
        return;
      }
      console.log(
        "Complete Recipe : ",
        result.candidates[0].content?.parts[0].text
      );
      completeRecipe = result.candidates[0].content?.parts[0].text;
    }

    const imageUrl = "";
    const insertedRecordResult = await SaveToDb(
      completeRecipe,
      imageUrl
    );
    console.log("Inserted Record Result: ", insertedRecordResult);
    setOpenLoading(false);
  };

  const SaveToDb = async (content: any, imageUrl: string) => {
    // Parse content if it's a string
    let parsedContent: any = content;
    if (typeof content === "string") {
      try {
        parsedContent = JSON.parse(content);
      } catch (err) {
        console.error("Failed to parse content JSON:", err);
        parsedContent = {};
      }
    }

    // Prepare data for Strapi
    const data = {
      recipeImage: imageUrl, // use the variable, not string
      recipeName: parsedContent.recipeName || "",
      description: parsedContent.description || "",
      ingredients: parsedContent.ingredients || [],
      steps: parsedContent.steps || [],
      calories: parsedContent.calories || 0,
      cookTime: parsedContent.cookTime || 0,
      serveTo: parsedContent.serveTo || 1,
      imagePrompt: parsedContent.imagePrompt || "",
      userEmail: user?.email || "",
      category: parsedContent.category || [],
    };

    console.log("Saving to DB:", data); // 🔥 debug

    const result = await GlobalApi.CreateNewRecipe(data);
    const updateUser = await GlobalApi.UpdateUser(user?.documentId, {
      name: user?.name,
      email: user?.email,
      picture: user?.picture,
      pref: null,
      credits: user?.credits - 1,
    });
    console.log("Update User Result: ", updateUser);
    // setUser({...user, credits:  user?.credits -1});
    return result.data.data;
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("./../assets/images/pan.gif")}
        style={styles.panImage}
      />
      <Text>{openLoading ? "Loading..." : ""}</Text>
      <Text style={styles.heading}>Warm up your stove and let get cooking</Text>
      <Text style={styles.subHeading}>Make something for you</Text>
      <TextInput
        multiline={true}
        onChangeText={(value) => setUserInput(value)}
        numberOfLines={3}
        style={styles.textInput}
        placeholderTextColor={Colors.GRAY}
        placeholder="What you want to create? Add ingredients etc"
      />
      <Button
        label="Generate Recipe"
        loading={loading}
        icon={"sparkles"}
        onPress={() => OnGenerate()}
      />
      <Text>{openLoading ? "Loading..." : "hiii"}</Text>
      <LoadingDialog visible1={openLoading} />
      <ActionSheet gestureEnabled ref={actionSheetRef}>
        <View style={styles.actionSheetContainer}>
          <Text style={styles.heading}>Select Recipe</Text>
          <View>
            {recipeOptions?.map((item: any, index: any) => (
              <TouchableOpacity
                onPress={() => GenerateCompleteRecipe(item)}
                key={index}
                style={styles.recipeOptionContainer}
              >
                <Text
                  style={{
                    fontFamily: "outfit-bold",
                    fontSize: 16,
                  }}
                >
                  {item?.recipeName}
                </Text>
                <Text
                  style={{
                    fontFamily: "outfit",
                    color: Colors.GRAY,
                  }}
                >
                  {item?.description}
                </Text>
              </TouchableOpacity>
            ))}
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
