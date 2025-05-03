<template>
  <div
    class="h-[80vh] sm:h-[83vh] lg:h-[80vh] flex flex-col md:flex-row bg-gray-50"
  >
    <aside
      class="w-full md:w-64 bg-white p-4 flex flex-row items-center md:items-start md:flex-col gap-4 overflow-x-auto md:overflow-visible"
    >
      <h2 class="text-lg md:text-xl font-semibold mb-0 md:mb-6">
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
        v-if="user"
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
    </aside>

    <!-- Main Chat -->
    <main class="flex-1 h-full overflow-y-auto">
      <component :is="currentComponent" class="h-full" />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../../store/user";
import { storeToRefs } from "pinia";
import GeminiAI from "./GeminiAI.vue";
import AdminChat from "./AdminChat.vue";
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const activeTab = ref("ai");
const currentComponent = computed(() =>
  activeTab.value === "ai" ? GeminiAI : AdminChat
);
</script>
