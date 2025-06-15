import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";


const MODEL_NAME = "models/gemini-1.5-flash"; // or "models/gemini-1.5-pro"
const API_KEY = "AIzaSyC03XU2BioRotDVNMaDJGSDJpuXxDWwr2I"; // Replace with a valid, active API key

async function runChat(prompt) {
  try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM,
        },
      ];

       const generationConfig = {
          temperature: 0.7,
          maxOutputTokens: 512,
       };

       const chat = model.startChat({
          safetySettings,
          generationConfig,
          history: [],
       });

       const result = await chat.sendMessage(prompt);
       console.log("Response:", result.response.text());
       return result.response.text();
  } 
  catch (error) {
     console.error("runChat error:", error);
     throw error;
  }
}

export default runChat;