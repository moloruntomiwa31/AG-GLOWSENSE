<template>
  <div class="flex flex-col h-full">
    <!-- Chat history -->
    <div class="flex-grow overflow-y-auto space-y-2 p-4">
      <div
        v-if="messages.length === 0"
        class="text-gray-500 text-center mt-10 text-2xl"
      >
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

    <form
      class="flex items-center gap-2 border-t p-4 bg-white shadow-[0px_30px_20px_0px_rgba(0,0,0,0.5)]"
      @submit.prevent="handleResponse"
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
import Messages from "./Messages.vue";
import useAiChat from "../../composables/useAiChat";
const { messages, fetchAnswer, isLoading } = useAiChat();
const inputQuestion = ref("");
const handleResponse = async () => {
  await fetchAnswer(inputQuestion.value);
  inputQuestion.value = "";
};
</script>
