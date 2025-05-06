import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const useAiMessagesStore = defineStore("aiMessages", () => {
  const messages = ref([]);
  const isLoading = ref(false);

  return { messages, isLoading };
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAiMessagesStore, import.meta.hot));
}