<template>
  <div class="flex flex-col h-full">
    <div class="flex-grow overflow-y-auto space-y-2 p-4">
      <div v-if="messages.length === 0" class="text-gray-500 text-center mt-10 text-2xl">
        👨‍💼 This is the admin chat. Leave a message and we'll respond.
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
      class="flex items-center gap-2 border-t p-4 bg-white"
      @submit.prevent="sendMessage"
    >
      <input
        v-model="inputMessage"
        type="text"
        placeholder="Write a message to admin..."
        class="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <button
        :disabled="!inputMessage || isSending"
        type="submit"
        class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
      >
        {{ isSending ? "..." : "Send" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Messages from "./Messages.vue";

const inputMessage = ref("");
const messages = ref([]);
const isSending = ref(false);

const sendMessage = async () => {
  if (!inputMessage.value.trim()) return;

  isSending.value = true;
  messages.value.push({ content: inputMessage.value, isUser: true });

  setTimeout(() => {
    messages.value.push({
      content: "Thanks! An admin will respond shortly. ✅",
      isUser: false,
    });
    isSending.value = false;
    inputMessage.value = "";
  }, 1000);
};
</script>
