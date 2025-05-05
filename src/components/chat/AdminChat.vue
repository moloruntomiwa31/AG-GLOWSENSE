<template>
  <div class="flex h-full">
    <!-- Admin: Show user list -->
    <!-- <UserList v-if="user.isAdmin" :userList="users" @select-user="selectUser" /> -->

    <!-- Main Chat Area -->
    <div class="flex flex-col flex-grow">
      <div class="flex-grow overflow-y-auto space-y-2 p-4">
        <div
          v-if="!user.isAdmin && messages.length === 0"
          class="text-center text-gray-500 text-2xl mt-10"
        >
          Start a chat with admin
        </div>
        <div
          v-else-if="user.isAdmin"
          class="text-center text-gray-500 text-2xl mt-10"
        >
          Select a user to chat with
        </div>

        <TransitionGroup v-else name="message" tag="div">
          <Messages
            v-for="(message, index) in messages"
            :key="index"
            :message="message"
          />
        </TransitionGroup>
      </div>

      <!-- Chat Input -->
      <form
        class="flex items-center gap-2 border-t p-4 bg-white"
      >
        <input
          v-model="inputMessage"
          type="text"
          placeholder="Type a message..."
          class="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          :disabled="!inputMessage || isSending"
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {{ isSending ? "..." : "Send" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import Messages from "./Messages.vue";

const inputMessage = ref("");
const isSending = ref(false);
const messages = ref([]);

const { user } = storeToRefs(useUserStore());
</script>
