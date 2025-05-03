<template>
  <div class="flex flex-col h-full">
    <!-- Chat history -->
    <div class="flex-grow overflow-y-auto space-y-2 p-4">
      <div v-if="messages.length === 0" class="text-gray-500 text-center mt-10 text-2xl">
        🤖 Hello, I'm your Beauty AI Assistant. Ask me anything!
      </div>
      <TransitionGroup name="message" tag="div">
        <Messages
          v-for="(message, index) in messages"
          :key="index"
          :message="message"
        />
      </TransitionGroup>
    </div>

    <!-- Input field -->
    <form
      class="flex items-center gap-2 border-t p-4 bg-white"
      @submit.prevent="fetchAnswer"
    >
      <input
        v-model="inputQuestion"
        type="text"
        placeholder="Type a message..."
        class="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        :disabled="!inputQuestion || isLoading"
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {{ isLoading ? "..." : "Send" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useGetGenerativeModelGP } from "../../composables/useGetGenerativeModelGP.js";
import Messages from "./Messages.vue";

const inputQuestion = ref("");
const messages = ref([]);
const isLoading = ref(false);

const fetchAnswer = async () => {
  if (!inputQuestion.value.trim()) return;
  isLoading.value = true;

  messages.value.push({ content: inputQuestion.value, isUser: true });

  try {
    const aiReply = await useGetGenerativeModelGP(inputQuestion.value);
    messages.value.push({ content: aiReply, isUser: false });
  } catch (error) {
    messages.value.push({
      content: "⚠️ Sorry, something went wrong.",
      isUser: false,
    });
    console.error(error);
  } finally {
    inputQuestion.value = "";
    isLoading.value = false;
  }
};
</script>
