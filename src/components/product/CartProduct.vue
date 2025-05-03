<template>
  <div v-if="filteredProducts.length > 0" class="p-6">
    <div
      class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="bg-[#6C4A4A] text-[#EDEDED] rounded-xl shadow-lg overflow-hidden flex flex-col transition hover:scale-[1.03] duration-200"
      >
        <img
          :src="product.image"
          :alt="`Image of ${product.name}`"
          class="w-full h-48 object-cover"
        />

        <div class="p-4 flex flex-col justify-between flex-1">
          <div class="flex flex-col gap-2 mb-4">
            <h3 class="capitalize font-semibold text-lg">
              {{ product.name }}
            </h3>
            <p class="font-bold text-sm">Price: ₦{{ product.price }}</p>
            <Star />
          </div>

          <Button
            @click="checkProductdetails(product.id)"
            class="capitalize text-base text-white bg-[#C89595] hover:bg-red-400 duration-150 p-2 rounded-md w-full"
          >
            Check Details
          </Button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="min-h-[80vh] flex items-center justify-center text-center">
    <h1 class="text-3xl font-semibold">No Results Found</h1>
  </div>
</template>

<script setup>
import Star from "../home/Star.vue";
import Button from "../fixed/Button.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../store/user";
import { useToast } from "../../store/toast";

const router = useRouter();
const userData = useUserStore();
const toast = useToast();

defineProps(["filteredProducts"]);

const checkProductdetails = (id) => {
  if (userData.user) {
    router.push(`/products/${id}`);
  } else {
    toast.addToast("User has to be authenticated!", "error");
    router.push("/signup");
  }
};
</script>
