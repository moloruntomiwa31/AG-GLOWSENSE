<template>
  <header
    v-if="route.path !== '/chat'"
    class="mainStyles items-center text-white min-w-full sticky top-0 pb-8 z-index"
  >
    <div
      class="logo flex items-center cursor-pointer"
      @click="router.push('/')"
    >
      <img
        class="w-10"
        src="../../assets/NoBackground.png"
        alt="AG-Glowsense"
      />
      <h1
        class="text-[0.75rem] md:text-sm font-bold uppercase font-serif whitespace-nowrap"
      >
        Ag-glowsense
      </h1>
    </div>
    <!-- mobile -->

    <!-- desktop view -->
    <nav class="hidden lg:flex justify-between items-center">
      <RouterLink class="linkStyles" active-class="active" to="/"
        >Home</RouterLink
      >
      <RouterLink class="linkStyles" active-class="active" to="/about"
        >About</RouterLink
      >
      <RouterLink to="/contacts" active-class="active">
        <p>Contact</p>
      </RouterLink>
      <RouterLink class="linkStyles" active-class="active" to="/products"
        >Products</RouterLink
      >
      <RouterLink class="linkStyles" active-class="active" to="/blogs"
        >Blogs</RouterLink
      >
      <RouterLink class="linkStyles" active-class="active" to="/chat"
        >Chat With Us</RouterLink
      >
    </nav>
    <template v-if="userData.userSet">
      <div
        class="flex space-x-3 md:space-x-6 items-center"
        v-if="userData.user"
      >
        <RouterLink
          to="/cart"
          class="flex flex-col relative hover:text-red-300 duration-150"
          active-class="active"
        >
          <div>
            <img src="../../assets/cart.svg" alt="Cart" />
            <p>Cart</p>
          </div>
          <div
            class="bg-gray-400 rounded-full p-1 absolute top-[-15px] right-0 w-[25px] h-[25px] flex justify-center items-center"
          >
            <p class="text-red-200">{{ store.cartLength }}</p>
          </div>
        </RouterLink>
        <Button class="bg-red-300 p-2 mt-1 hover:bg-red-400" @click="logOut"
          >LogOut</Button
        >
      </div>

      <div v-if="!userData.user">
        <RouterLink to="/signup" class="linkStyles" active-class="active"
          >Sign Up</RouterLink
        >
        <RouterLink to="/login" class="linkStyles" active-class="active"
          >Log In</RouterLink
        >
      </div>
    </template>
  </header>
  <!-- mobile -->
  <div
    v-if="route.path !== '/chat'"
    class="fixed bottom-0 w-full h-[50px] flex justify-around items-center px-2 bg-neutral-50 rounded-tl-3xl rounded-tr-3xl text-[#463333] lg:hidden z-index shadow-[0px_30px_20px_0px_rgba(0,0,0,0.5)]"
  >
    <RouterLink
      class="flex flex-col justify-between items-center w-1/5 h-full relative py-4"
      v-for="data in mobileNav"
      :key="data.text"
      :to="data.link"
    >
      <div
        v-if="route.path === data.link"
        class="absolute bottom-1 left-1/6 w-1/5 h-1 bg-red-400 rounded-3xl"
      ></div>
      <div class="flex-grow"></div>
      <img :src="data.image" :alt="data.text" class="w-6 h-6" />
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "../../store/user";
import { useStore } from "../../store/cart";
import image1 from "../../assets/homeSvg/home.svg";
import image2 from "../../assets/homeSvg/about.svg";
import image3 from "../../assets/homeSvg/product.svg";
import image4 from "../../assets/homeSvg/blog.svg";
import image5 from "../../assets/homeSvg/chat.svg";
import image6 from "../../assets/homeSvg/contact.svg";
import Button from "./Button.vue";
import { useToast } from "../../store/toast";
const toast = useToast();

const userData = useUserStore();
const store = useStore();
const router = useRouter();
const route = useRoute();

router.afterEach(() => window.scrollTo({ top: 0, behavior: "smooth" }));

const logOut = () => {
  userData.logOut();
  toast.addToast("User Logged Out!", "info");
  router.push("/");
};

const mobileNav = ref([
  {
    image: image1,
    text: "Home",
    link: "/",
  },
  {
    image: image2,
    text: "About",
    link: "/about",
  },
  {
    image: image6,
    text: "Contact",
    link: "/contacts",
  },
  {
    image: image3,
    text: "Products",
    link: "/products",
  },
  {
    image: image4,
    text: "Blogs",
    link: "/blogs",
  },
  {
    image: image5,
    text: "AI",
    link: "/chat",
  },
]);
</script>

<style scoped>
.active {
  color: pink;
}

.mobileActive {
  color: #900c3f;
}

header {
  background-color: #463333;
}

.z-index {
  z-index: 10000;
}
</style>
