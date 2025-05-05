<template>
  <div
    :class="[
      'p-3 max-w-[80%] rounded-lg shadow text-sm break-words mt-4 relative',
      message.isUser
        ? 'bg-blue-100 text-right ml-auto'
        : 'bg-gray-200 text-left mr-auto',
    ]"
  >
    <div class="my-3">{{ message.content }}</div>
    <div>
      <span
        class="text-sm absolute top-1 left-3 font-bold"
        :class="message.isUser ? 'text-red-500' : 'text-emerald-500'"
      >
        {{ message.isUser ? "You" : "AI" }}
      </span>
      <span class="text-xs text-gray-500 absolute bottom-1 right-2">
        {{ formatTime(message.createdAt) }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: Object,
    required: true,
  },
});
const formatTime = (date) => {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
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
  transform: translateY(10px);
}
</style>
