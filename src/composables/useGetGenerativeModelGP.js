import { useGenAi } from "./useGenAi.js";

export const useGetGenerativeModelGP = async (prompt) => {
  const text = await useGenAi(prompt);
  return text;
};
