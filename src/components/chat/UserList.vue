<template>
  <div class="w-1/4 border-r overflow-y-auto p-4">
    <div
      v-for="user in userList"
      :key="user.id"
      class="cursor-pointer p-2 hover:bg-gray-100"
      @click="$emit('select-user', user)"
    >
      {{ user.first_name || user.uid }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  userList: Array,
});
</script>
