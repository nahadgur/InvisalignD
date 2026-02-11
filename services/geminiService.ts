
import { GoogleGenAI } from "@google/genai";

export const getSmileAdvice = async (userMessage: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: "You are a professional dental assistant for Invisalign Dentists, a high-end referral network. Be friendly, encouraging, and informative. Your goal is to explain the benefits of Invisalign (clear, comfortable, removable) and gently encourage the user to book a free consultation with one of our Platinum Partners. Keep answers concise.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please fill out our contact form and one of our human specialists will reach out shortly!";
  }
};
