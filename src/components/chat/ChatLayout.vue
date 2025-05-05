<template>
  <div class="h-screen flex flex-col md:flex-row bg-gray-50">
    <aside
      class="w-full md:w-64 bg-white p-4 flex flex-row md:flex-col items-center justify-between md:items-start gap-4 overflow-x-auto md:overflow-visible"
    >
      <h2 class="text-lg md:text-xl hidden lg:block font-semibold mb-0">
        Chat Options
      </h2>
      <button
        @click="activeTab = 'ai'"
        class="md:w-[150px] max-w-[150px] rounded-tr-md rounded-bl-md rounded-tl-sm rounded-br-sm"
        :class="[
          'flex-1 md:flex-none text-left px-4 py-2',
          activeTab === 'ai'
            ? 'bg-blue-500 text-white'
            : 'hover:bg-blue-100 text-gray-700',
        ]"
      >
        🤖 AI
      </button>

      <button
        v-if="0"
        @click="activeTab = 'admin'"
        class="md:w-[150px] rounded-tr-md rounded-bl-md rounded-tl-sm rounded-br-sm whitespace-nowrap"
        :class="[
          'flex-1 md:flex-none text-left px-4 py-2',
          activeTab === 'admin'
            ? 'bg-green-500 text-white'
            : 'hover:bg-green-100 text-gray-700',
        ]"
      >
        👨‍💼Admin
      </button>

      <div class="mt-0 md:mt-auto md:self-start">
        <button
          v-if="messages.length > 0"
          @click="showConfirmModal = true"
          class="md:w-[150px] rounded-md md:hidden text-left px-4 py-2 bg-red-400 text-white hover:bg-red-600"
        >
          🗑️
        </button>
        <button
          v-if="messages.length > 0"
          @click="showConfirmModal = true"
          class="md:w-[150px] rounded-md hidden md:block text-left px-4 py-2 bg-red-400 text-white hover:bg-red-600"
        >
          🗑️Clear Chats
        </button>

        <button
          @click="goBack"
          class="text-sm md:text-base px-4 py-2 rounded-md"
        >
          ← Back
        </button>
      </div>
    </aside>

    <!-- Confirmation Modal -->

    <Teleport to="body">
      <div
        v-if="showConfirmModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h3 class="text-lg font-semibold mb-4 text-gray-800">
            Clear All Chats?
          </h3>
          <p class="text-sm text-gray-600 mb-6">
            This action cannot be undone. Are you sure?
          </p>
          <div class="flex justify-end gap-2">
            <button
              class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md"
              @click="showConfirmModal = false"
            >
              Cancel
            </button>
            <button
              class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
              @click="handleAllChatsDelete"
            >
              Yes, Clear
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Main Chat -->
    <main class="flex-1 h-full overflow-y-auto">
      <component :is="currentComponent" />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../../store/user";
import useAiChat from "../../composables/useAiChat";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import GeminiAI from "./GeminiAI.vue";
import AdminChat from "./AdminChat.vue";
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const router = useRouter();
const { clearChats, messages } = useAiChat();

const activeTab = ref("ai");
const showConfirmModal = ref(false);
const currentComponent = computed(() =>
  activeTab.value === "ai" ? GeminiAI : AdminChat
);
const goBack = () => {
  router.back();
};
const handleAllChatsDelete = () => {
  clearChats();
  showConfirmModal.value = false;
};
</script>
