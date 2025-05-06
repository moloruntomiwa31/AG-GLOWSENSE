import { GoogleGenAI } from "@google/genai";
import { useAiMessagesStore } from "../store/aiMessages";
import { storeToRefs } from "pinia";
import { computed } from "vue";

export async function useGenAi(prompt) {
  const genAI = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  const { messages } = storeToRefs(useAiMessagesStore());

  const history = computed(() =>
    messages.value
      .map((msg) => `${msg.isUser ? "User" : "AI"}: ${msg.content}`)
      .join("\n")
  );

  const newPrompt = `
You are a highly knowledgeable and helpful AI assistant specializing in skincare, beauty, and cosmetics.
Your goal is to provide concise, scientifically accurate, and practical advice to users asking questions in these domains.

Chat history:
${history.value.slice(-5)}

Task:
- Understand the user's query related to skincare, beauty, or cosmetics.
- Respond in **2 sentences** maximum.
- Use clear, friendly language while maintaining expertise.
- If relevant, recommend a product type or best practice.
- Avoid vague or overly general responses.

User question: "${prompt}"
`;

  const result = await genAI.models.generateContent({
    model: "gemini-2.5-flash-preview-04-17",
    contents: newPrompt,
  });

  return result.text;
}
