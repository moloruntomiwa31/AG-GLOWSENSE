import { useGenAi } from "./useGenAi.js";

export const useGetGenerativeModelGP = async (prompt) => {
  const newPrompt = `You're an AI Assistant specialised in skincare, beauty and cosmetics related topics. Please provide a very brief, accurate and helpful information for the following question: ${prompt}`;
  const model = await useGenAi();
  const result = await model.generateContent(newPrompt);
  const response = result.response;
  const text = response.text();

  return text;
};
