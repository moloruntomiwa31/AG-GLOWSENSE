<template>
  <PreLoader v-if="isLoading" />
  <main class="space-y-8 md:space-y-0 md:p-2" v-else>
    <div class="w-full my-8 px-4 md:px-8">
      <!-- Section Title -->
      <h1 class="text-3xl font-bold text-center text-[#463333] mb-6">
        Available Products
      </h1>

      <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div class="flex items-center gap-4 w-full md:w-auto">
          <h3 class="font-semibold text-base whitespace-nowrap">Filter By</h3>
          <ProductFilter
            @update:modelValue="updateOption"
            :options="productOptions"
          />
        </div>

        <div class="w-full md:w-1/2">
          <Input
            v-model="searchProduct"
            type="text"
            class="w-full border-2 border-red-400 p-3 rounded-md placeholder:text-black focus:outline-none focus:ring-2 focus:ring-red-300"
            :placeholder="searchPlaceholder"
          />
        </div>
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
const productOptions = ["all", "bodyWash", "faceWash", "vive"];
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
