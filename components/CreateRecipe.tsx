import { UserContext } from "@/context/UserContext";
import Colors from "@/services/Colors";
import GlobalApi from "@/services/GlobalApi";
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
  const {user, setUser} = useContext(UserContext);
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
    // const result = await GlobalApi.AiModelGemini(`
    //       Based on the user instruction, create exactly 3 different recipe variants.
    //       Requirements:
    //       1. Each recipe must have:
    //         - "recipeName": include an emoji
    //         - "description": 2-line description
    //         - "ingredients": main ingredient list (no quantities or sizes)
    //       2. Return the output **only in JSON format** with these fields: recipeName, description, ingredients
    //       3. Do not include any extra text outside JSON
    //       4. Use creative recipe names and descriptions
    //       User Instruction: "${userInput}"`);
    // if (!result.candidates || result.candidates.length === 0) {
    //   return "No content returned by the model.";
    // }
    // if (!result.candidates[0].content || !result.candidates[0].content.parts) {
    //   return "No content parts returned by the model.";
    // }

    // console.log(
    //   "AI Model Result: ",
    //   result.candidates[0].content?.parts[0].text
    // );
    const dummyRecipes = [
      {
        recipeName: "🍄 Midnight Truffle Forest Pizza",
        description:
          "An earthy journey through a moonlit woodland floor topped with decadent oils.\nSilky textures meet intense umami flavors for the ultimate sophisticated slice.",
        ingredients: [
          "Pizza dough",
          "Truffle oil",
          "Wild mushrooms",
          "Mozzarella cheese",
          "Fresh thyme",
          "Garlic cream",
        ],
      },
      {
        recipeName: "🔥 Tropical Inferno Heatwave Pizza",
        description:
          "Sweet meets heat in this daring combination of sun-drenched fruit and fiery peppers.\nA bold fusion designed to spark a flavor explosion on every single bite.",
        ingredients: [
          "Pizza dough",
          "Spicy pepperoni",
          "Pineapple",
          "Jalapeños",
          "Tomato sauce",
          "Hot honey",
          "Red pepper flakes",
        ],
      },
      {
        recipeName: "🌊 Azure Coast Mediterranean Pizza",
        description:
          "Fresh sea breezes captured atop a golden crust with a burst of citrus zest.\nA light and refreshing coastal escape that brings the ocean to your table.",
        ingredients: [
          "Pizza dough",
          "Grilled shrimp",
          "Feta cheese",
          "Kalamata olives",
          "Cherry tomatoes",
          "Red onion",
          "Fresh parsley",
          "Lemon zest",
        ],
      },
    ];
   
    // if (!result.candidates[0].content?.parts[0].text) {
    //   Alert.alert("Failed to generate recipe. Please try again.");
    //   setLoading(false);
    //   return;
    // }
    setRecipeOptions(JSON.parse(JSON.stringify(dummyRecipes)) );
    setLoading(false);
    actionSheetRef.current?.show();
  };

  const GenerateCompleteRecipe = async (option: any) => {
    setOpenLoading(true);

    actionSheetRef.current?.hide();

    // const PROMPT = `RecipeName: ${option?.recipeName} Description: ${option?.description} ${Prompt.GENERATE_COMPLETE_RECIPE}`;
    // const result = await GlobalApi.AiModelGemini(PROMPT);
    // if (!result.candidates || result.candidates.length === 0) {
    //   return "No content returned by the model.";
    // }
    // if (!result.candidates[0].content || !result.candidates[0].content.parts) {
    //   return "No content parts returned by the model.";
    // }

    // console.log(
    //   "AI Model Result: ",
    //   result.candidates[0].content?.parts[0].text
    // );
    const imageUrl = "#";
    // const insertedRecordResult = await SaveToDb(
    //   result.candidates[0].content?.parts[0].text,
    //   imageUrl
    // );

    const dummyRecipeContent = {
  "recipeName": "🔥 Tropical Inferno Heatwave Pizza",
  "description": "Sweet meets heat in this daring combination of sun-drenched fruit and fiery peppers. A bold fusion designed to spark a flavor explosion on every single bite.",      
  "ingredients": [
    {
      "ingredient": "Pizza Dough",
      "icon": "🍞",
      "quantity": "1 large ball (approx. 400g)"
    },
    {
      "ingredient": "Spicy Arrabbiata Sauce",
      "icon": "🥫",
      "quantity": "1/2 cup"
    },
    {
      "ingredient": "Shredded Mozzarella Cheese",
      "icon": "🧀",
      "quantity": "1.5 cups"
    },
    {
      "ingredient": "Fresh Pineapple Chunks",
      "icon": "🍍",
      "quantity": "1/2 cup"
    },
    {
      "ingredient": "Fresh Sliced Mango",
      "icon": "🥭",
      "quantity": "1/2 cup"
    },
    {
      "ingredient": "Habanero Pepper (seeded and minced)",
      "icon": "🌶️",
      "quantity": "1 small pepper"
    },
    {
      "ingredient": "Sliced Jalapeños",
      "icon": "🔥",
      "quantity": "10-12 slices"
    },
    {
      "ingredient": "Spicy Italian Salami or Pepperoni",
      "icon": "🥩",
      "quantity": "1/2 cup"
    },
    {
      "ingredient": "Red Onion (thinly sliced)",
      "icon": "🧅",
      "quantity": "1/4 cup"
    },
    {
      "ingredient": "Hot Honey Drizzle",
      "icon": "🍯",
      "quantity": "2 tablespoons"
    },
    {
      "ingredient": "Fresh Cilantro",
      "icon": "🌿",
      "quantity": "Small handful"
    }
  ],
  "steps": [
    "Preheat your oven to its highest setting (usually 475°F/245°C) or prepare a pizza stone.",
    "Roll out the pizza dough on a floured surface until thin and circular.",
    "Spread a layer of spicy Arrabbiata sauce evenly across the dough, leaving a small border for the crust.",
    "Sprinkle the shredded mozzarella cheese generously over the sauce.",
    "Arrange the pineapple chunks, mango slices, salami, and red onion across the pizza.",
    "Evenly scatter the minced habanero and jalapeño slices for a balanced heat distribution.",
    "Bake for 10-12 minutes or until the crust is golden brown and the cheese is bubbling and charred in spots.",
    "Remove from the oven and immediately drizzle the hot honey over the entire pizza.",
    "Garnish with fresh cilantro leaves and slice immediately.",
    "Serve while piping hot for the maximum flavor explosion."
  ],
  "calories": 1250,
  "cookTime": 25,
  "serveTo": 2,
  "imagePrompt": "Realistic, high-angle professional food photography of a Tropical Inferno Heatwave Pizza on a rustic charred wooden board. The pizza features a blistered, bubbly crust, melted mozzarella, vibrant golden pineapple chunks, bright mango slices, and thin red habanero rings. Steam is rising from the pizza. A glistening drizzle of hot honey is visible under warm, cinematic lighting with fresh cilantro scattered on top. 8k resolution, macro detail."
};
    const insertedRecordResult = await SaveToDb(
      dummyRecipeContent,
      imageUrl
    )
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
      userEmail: user?.email || "unknown@unknown.com",
    };

    console.log("Saving to DB:", data); // 🔥 debug

    const result = await GlobalApi.CreateNewRecipe(data);
    const updateUser = await GlobalApi.UpdateUser(user?.documentId, {name: user?.name, email: user?.email, picture: user?.picture, pref: null, credits:  user?.credits -1});
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
