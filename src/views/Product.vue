<template>
  <PreLoader v-if="isLoading" />
  <main class="space-y-8 md:space-y-0 md:p-2" v-else>
    <div class="w-full my-4">
      <h1 class="text-[2rem] font-bold capitalize text-center text-[#463333]">
        Available Products
      </h1>
    </div>
    <!-- search box -->
    <div
      class="flex flex-col md:flex-row gap-4 justify-center items-center md:justify-between md:px-8"
    >
      <!-- filter -->
      <div class="flex items-center gap-4">
        <h3 class="font-bold">Filter By</h3>
        <ProductFilter
          @update:modelValue="updateOption"
          :options="productOptions"
        />
      </div>
      <!-- input -->
      <div class="flex items-center md:justify-end gap-2">
        <Input
          v-model="searchProduct"
          type="text"
          class="border-2 border-red-400 p-2 md:p-4 outline-none placeholder:text-black"
          :placeholder="searchPlaceholder"
        ></Input>
      </div>
    </div>

    <!-- products -->
    <CartProduct :filteredProducts="filteredProducts" />
  </main>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import PreLoader from "../components/fixed/PreLoader.vue";
import CartProduct from "../components/product/CartProduct.vue";
import Input from "../components/fixed/Input.vue";
import { useProductStore } from "../store/productStore";
import ProductFilter from "../components/product/ProductFilter.vue";
//routes
const router = useRouter();
const route = useRoute();

//getProducts
const productStore = useProductStore();
const productOptions = ['all', 'bodyWash', 'faceWash', 'vive']
//preloader
const isLoading = ref(true);

//v-models
const searchProduct = ref("");
const searchPlaceholder = ref("Search Products...");
const selectOption = ref("all");

//events
const updateOption = (option) => {
  selectOption.value = option;
  router.push({ query: { product_type: option } });
};

//computed
const filteredProducts = computed(() => {
  if (searchProduct.value || selectOption.value == "all") {
    return productStore.products.filter((d) =>
      d.name.toLowerCase().includes(searchProduct.value.toLowerCase())
    );
  }
  if (selectOption.value !== "all") {
    return productStore.products.filter(
      (d) => d.product_type.toLowerCase() == selectOption.value.toLowerCase()
    );
  }
});

//hooks
onMounted(() => {
  setTimeout(() => (isLoading.value = false), 2000);
  selectOption.value = route.query.product_type || "all";
});
</script>

<style scoped></style>
