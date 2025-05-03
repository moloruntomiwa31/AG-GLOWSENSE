<template>
  <div
    :class="[
      'p-3 max-w-[80%] rounded-lg shadow text-sm break-words mt-4',
      message.isUser
        ? 'bg-blue-100 text-right ml-auto'
        : 'bg-gray-200 text-left mr-auto',
    ]"
  >
    {{ message.content }}
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: Object,
    required: true,
  },
});
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
