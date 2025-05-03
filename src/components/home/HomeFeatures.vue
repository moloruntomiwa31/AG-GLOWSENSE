<template>
  <section class="space-y-10 mt-10" id="features">
    <div class="header border-2 relative border-gray-400">
      <h1
        class="absoluteCenter whitespace-nowrap bg-white px-4 md:px-8 py-4 md:text-2xl text-red-500 uppercase font-medium rounded-2xl"
      >
        Benefit Our Services
      </h1>
    </div>
    <div class="grid place-items-center px-12 space-y-8 w-full">
      <div
        v-for="product in productDetails"
        :key="product.title"
        class="flex flex-col space-y-4 md:space-y-0 md:flex-row md:gap-4 mx-auto items-center justify-center"
        :class="product.reverse ? 'md:flex-row-reverse' : ''"
      >
        <div
          style="
            background: linear-gradient(
              90deg,
              rgba(93, 2, 2, 0) 0%,
              rgba(93, 2, 2, 0.1) 100%
            );
          "
          class="mx-auto inline-block rounded-full p-8 shadow md:w-1/4"
        >
          <img
            :src="product.icon"
            alt="Product Feature Icon"
            class="w-full h-full"
          />
        </div>
        <div
          class="grid place-items-center text-center space-y-4 md:place-items-start md:text-start md:w-3/4 lg:w-1/2 md:space-y-2"
        >
          <h3 class="font-bold text-2xl w-3/4">{{ product.title }}</h3>
          <p class="text-gray-600 text-lg">{{ product.description }}.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from "vue";
import icon1 from "../../assets/homeSvg/natural.svg";
import icon2 from "../../assets/homeSvg/lotion.svg";
import icon3 from "../../assets/homeSvg/tested.svg";
const productDetails = reactive([
  {
    icon: icon1,
    title: "Natural & Organic Products",
    description:
      "Most significantly, those organic ingredients are farmed without the use of synthetic fertilizers, GMOs, pesticides, herbicides, or other additions or chemicals",
    reverse: false,
  },
  {
    icon: icon2,
    title: "Finest skincare lotions",
    description:
      "It contains vitamin E and essential fatty acids, which keep your skin hydrated and protect your natural skin barrier ",
    reverse: true,
  },
  {
    icon: icon3,
    title: "Medically tested and approved",
    description:
      "They have been completely tested by a medical agency. These products use prescription-strength ingredients to promote your overall skin health while helping you look and feel your best ",
    reverse: false,
  },
]);
</script>

<style scoped></style>
