export default {

    GENERATE_RECIPE_OPTIONS_PROMPT: (userInput: string)=>{
        return `
           Based on the user instruction, create exactly 3 different recipe variants.
           Requirements:
           1. Each recipe must have:
             - "recipeName": include an emoji
             - "description": 2-line description
             - "ingredients": main ingredient list (no quantities or sizes)
           2. Return the output **only in JSON format** with these fields: recipeName, description, ingredients
           3. Do not include any extra text outside JSON
           4. Use creative recipe names and descriptions
           User Instruction: "${userInput}"`
    },
    GENERATE_COMPLETE_RECIPE_PROMPT: ({recipeName, description}: {recipeName: string, description: string})=>{
        return `RecipeName: ${recipeName} Description: ${description} 
        - As per recipe Name and Description, Give me all list of ingredients as ingredient ,
        - emoji icons for each ingredient as icon, quantity as quantity, along with detail step by step  recipe as steps
        - Total Calories as calories (only number), Minutes to cook as cookTime and serving number as serveTo
        - relastic image Text prompt as per reciepe as imagePrompt
        - Give me category List for recipe from [Breakfast, Lunch, Dinner, Salad, Dessert, Fastfood, Drink, Cake] as category
        - Give me response in JSON format only`
    },

GENERATE_RECEPI_OPTION_PROMPT: `:Depends on user instruction create 3 different Recipe variant with Recipe Name with Emoji, 

2 line description and main ingredient list in JSON format with field recipeName,description,ingredients (without size) only`,



    GENERATE_COMPLETE_RECIPE: ` 

        - As per recipe Name and Description, Give me all list of ingredients as ingredient ,

        - emoji icons for each ingredient as icon, quantity as quantity, along with detail step by step  recipe as steps

        - Total Calories as calories (only number), Minutes to cook as cookTime and serving number as serveTo

        - relastic image Text prompt as per reciepe as imagePrompt

        - Give me response in JSON format only`

}

