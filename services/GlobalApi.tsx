import axios from 'axios';
import OpenAI from 'openai';

import {
  GoogleGenAI,
} from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
  });

   const tools = [
    {
      googleSearch: {
      }
    },
  ];
  const config = {
    thinkingConfig: {
      thinkingLevel: 'HIGH',
    },
    tools,
  };

  const model = 'gemini-3-flash-preview';
  


 
const axiosClient = axios.create({
    baseURL: 'http://192.168.43.123:1337/api',
    headers:{
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_KEY}`,
    }
})

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
});






const GetUserByEmail = (email:string) => axiosClient.get('/user-lists?filters[email][$eq]='+email);
const CreateNewUser = (data:object) => axiosClient.post('/user-lists', {data:data});
const GetCategories = () => axiosClient.get('/categories?populate=*');
const CreateNewRecipe = (data: any)=> axiosClient.post('/recipes', {data:data});
const AiModelGemini = async (prompt: string) => { 
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `${prompt}`,
        },
      ],
    },
  ];
  const response = await ai.models.generateContent({
    model,
    contents,
  });
  return response;}
const AiModel = async (prompt: string) => await openai.chat.completions.create({
    model: 'google/gemini-2.0-flash-exp:free',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    response_format: {type: 'json_object'},
  });


export default {
    GetUserByEmail,
    CreateNewUser,
    GetCategories,
    AiModel,
    AiModelGemini,
    CreateNewRecipe,
}