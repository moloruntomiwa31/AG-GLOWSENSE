<template>
  <PreLoader v-if="isLoading" />
  <main v-else>
    <!-- hero -->
    <!-- Hero Section -->
    <section class="hero min-h-[400px] lg:h-screen relative flex items-center">
      <div class="absolute inset-0 bg-black/60 z-0"></div>

      <div class="relative z-10 px-6 md:px-16 w-full max-w-3xl space-y-4">
        <h1
          class="text-white text-5xl md:text-6xl lg:text-7xl font-extrabold"
        >
          Treat your skin<span class="text-red-300"> with nature.</span>
        </h1>

        <p class="text-white text-lg md:text-xl max-w-md">
          Keep your body well groomed and enjoy treatment services from us. Get
          attractive discounts today.
        </p>

        <Button
          @click="router.push('/products')"
          class="bg-white text-red-400 border-2 border-red-300 p-4 font-extrabold hover:bg-red-300 hover:text-white hover:border-red-400 transition duration-300"
        >
          Explore Products
        </Button>
      </div>

      <!-- Scroll Down Button -->
      <DownButton
        @scroll="scrollTosection('features')"
        class="hidden md:block absolute left-1/2 bottom-20 transform -translate-x-1/2 border-2 border-white p-2 hover:bg-white transition duration-200 z-10"
      />
    </section>

    <!-- ----about---- -->
    <HomeFeatures />
    <!-- --------swiper------ -->
    <div class="my-8 space-y-8">
      <Swiper
        :modules="[EffectCube, Autoplay, Pagination]"
        :cube-effect="{
          shadow: false,
        }"
        :autoplay="{
          delay: 2000,
          disableOnInteraction: false,
        }"
        effect="card"
        :loop="true"
        :pagination="true"
      >
        <SwiperSlide v-for="photo in photos">
          <img :src="photo" alt="Product Image" />
        </SwiperSlide>
      </Swiper>
      <div class="flex justify-center">
        <Button
          class="bg-red-400 p-6 text-white duration-300 hover:bg-red-500 shadow-sm"
          @click="router.push('/products')"
          >Check Products</Button
        >
      </div>
    </div>
    <!-- -----testimonials -->
    <Testimonials />
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCube, Autoplay, Pagination } from "swiper/modules";
import { useRouter } from "vue-router";
import "swiper/css/effect-cube";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css";

import icon1 from "../assets/muse.jpg";
import icon2 from "../assets/lipbalm.jpg";
import icon4 from "../assets/museHands.jpg";
import icon5 from "../assets/face-mask.jpg";

import HomeFeatures from "../components/home/HomeFeatures.vue";
import Testimonials from "../components/home/Testimonials.vue";
import DownButton from "../components/fixed/DownButton.vue";
import PreLoader from "../components/fixed/PreLoader.vue";
import Button from "../components/fixed/Button.vue";
import useScroll from "../scroll";

const isLoading = ref("true");
const router = useRouter();
const shouldAnimate = ref(false);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
    shouldAnimate.value = true;
  }, 2000);
});

const { scrollTosection } = useScroll();
const photos = [icon1, icon2, icon4, icon5];
</script>

<style scoped>
.hero {
  background-image: url("../assets/womans-bust-hand-shoulder.jpg");
  background-repeat: no-repeat;
  background-position: right;
  background-size: cover;
}

.swiper {
  min-width: 80%;
  height: 400px;
}

.swiper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
:global(.swiper-pagination-bullet-active) {
  background-color: #f87171 !important;
}
</style>
