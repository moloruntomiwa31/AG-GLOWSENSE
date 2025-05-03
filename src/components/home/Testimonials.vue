<template>
  <section id="testimonials">
    <div class="header border-2 relative border-gray-400">
      <h1
        class="absoluteCenter whitespace-nowrap bg-white px-4 md:px-8 py-4 md:text-2xl text-red-500 uppercase font-medium rounded-2xl"
      >
        Testimonials
      </h1>
    </div>
    <div
      class="grid place-items-center grid-cols-1 md:grid-cols-3 p-8 gap-[20px]"
    >
      <div
        class="test p-8 md:h-[100%] shadow space-y-4 md:space-y-0 rounded-md"
        v-for="testimonial in testimonials"
        :key="testimonial.name"
      >
        <div class="flex gap-2 items-start justify-center">
          <div class="space-y-2 text-lg">
            <p>{{ testimonial.text }}</p>
            <h3 class="font-bold">{{ testimonial.name }}</h3>
            <Star />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from "vue";
import Star from "./Star.vue";
const testimonials = reactive([
  {
    name: "Femi Steves",
    text: "The exfoliation properties work very well and leaves my skin smooth with a nice and even glow! I've received so many compliments since I've been using the products!",
  },
  {
    name: "Oluwatoyin Afolake",
    text: "I really love the combination of the Smiling Beads Body Wash and the Softness Bliss Body Lotion on my body.",
  },
  {
    name: "Michael Oloruntomiwa",
    text: " My skin has not felt like this since my pre-teens! With results like this, I believe my search is over!",
  },
]);
</script>

<style scoped>
.grid-col {
  grid-template-columns: repeat(2, 1fr);
}

.test {
  background-image: url("../../assets/loveGrain.png"),
    linear-gradient(-270deg, #fdb1b1, #f2f2f2);
  background-position: top;
}
</style>
