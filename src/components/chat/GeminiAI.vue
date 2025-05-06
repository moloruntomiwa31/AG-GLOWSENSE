<template>
  <div class="flex flex-col h-full">
    <!-- Chat history -->
    <div
      ref="chatContainer"
      class="flex-grow overflow-y-auto space-y-2 p-4 scroll-smooth"
    >
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
import { ref, watch, nextTick } from "vue";
import Messages from "./Messages.vue";
import useAiChat from "../../composables/useAiChat";

const { messages, fetchAnswer, isLoading } = useAiChat();
const inputQuestion = ref("");
const chatContainer = ref(null);

// Auto-scroll to the bottom when new messages arrive
watch(
  () => [...messages.value],
  async () => {
    await nextTick();
    scrollToBottom();
  },
  { deep: true }
);

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

const handleResponse = async () => {
  await fetchAnswer(inputQuestion.value);
  inputQuestion.value = "";
  await nextTick();
  scrollToBottom();
};
</script>

<style scoped>
.message-enter-active,
.message-leave-active {
  transition: all 0.3s ease;
}
.message-enter-from,
.message-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
