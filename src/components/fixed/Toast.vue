<template>
    <div :class="toast.bgColor" class="toast-wrapper mt-3 md:mt-0 p-2 md:p-4 rounded-md fixed top-[6rem] z-50 right-4  text-center">
        <div class="toast text text-white flex items-center space-x-2">
            <img :src="toast.icon" alt="icon">
            <p>{{ toast.toastText }}</p>
        </div>
    </div>
</template>

<script setup>
import { useToast } from '../../store/toast';
const toast = useToast()
</script>