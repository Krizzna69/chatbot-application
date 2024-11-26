import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
let model = null;

try {
  if (!apiKey) {
    throw new Error('API key not found');
  }
  
  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: 'gemini-pro' });
} catch (error) {
  console.error('Gemini API initialization error:', error);
}

export async function generateGeminiResponse(prompt) {
  try {
    if (!genAI || !model) {
      return 'Error: Please configure your Gemini API key in the .env file to use the chat functionality.';
    }

    if (!prompt?.trim()) {
      throw new Error('Empty prompt');
    }

    const result = await model.generateContent(prompt);
    
    if (!result?.response) {
      throw new Error('No response from API');
    }
    
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    if (error.message?.includes('API key')) {
      return 'Error: Invalid API key. Please check your API key configuration.';
    }
    return 'I apologize, but I encountered an error. Please try again.';
  }
}</content>