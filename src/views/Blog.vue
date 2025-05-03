<template>
  <PreLoader v-if="isLoading" />
  <main v-else class="min-h-screen">
    <section class="flex flex-col items-center justify-center">
      <!-- Hero -->
      <div
        class="text-center grid place-items-center w-full px-6 py-12 md:py-0 blogHero relative min-h-[400px] lg:h-screen"
      >
        <div class="w-full max-w-3xl space-y-4">
          <h3 class="uppercase text-lg font-semibold text-gray-100">
            From the blog
          </h3>
          <h1 class="font-bold capitalize text-4xl lg:text-6xl text-red-300">
            We really have so much to share with you!
          </h1>
        </div>

        <DownButton
          @scroll="scrollTosection('blogs')"
          class="border-2 border-white p-2 absolute bottom-4 lg:bottom-24 hover:bg-white transition duration-200"
        />
      </div>

      <TheBlog />

      <section class="w-full grid place-items-center px-4 py-10">
        <main
          class="bg-[#463333] space-y-6 p-8 md:p-12 rounded-md w-full max-w-2xl"
        >
          <h1
            class="font-bold text-3xl md:text-4xl lg:text-5xl text-white text-center leading-snug"
          >
            <span class="text-red-300">Join</span> Our
            <span class="text-red-300">Newsletter!!</span>
          </h1>
          <form class="flex flex-col md:flex-row gap-4 w-full">
            <input
              type="email"
              class="rounded-md border-red-200 focus:border-red-400 transition border-2 p-3 outline-none bg-transparent placeholder:text-white text-white flex-1"
              placeholder="joinus@gmail.com"
            />
            <Button
              class="bg-black text-white px-6 py-2 rounded-md hover:opacity-80 transition"
              type="submit"
            >
              Join
            </Button>
          </form>
        </main>
      </section>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TheBlog from "../components/blog/TheBlog.vue";
import PreLoader from "../components/fixed/PreLoader.vue";
import DownButton from "../components/fixed/DownButton.vue";
import Button from "../components/fixed/Button.vue";

//composable
import useScroll from "../scroll";
const { scrollTosection } = useScroll();
//preloader
const isLoading = ref(true);

//hooks
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});
</script>

<style scoped>
.blogHero {
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.8)
    ),
    url("../assets/blogHero.jpg");
  background-position: left center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
