<template>
  <footer
    class="flex flex-col-reverse md:flex-row justify-around  px-8 pt-10 pb-20 lg:pb-10 gap-4"
  >
    <div class="flex flex-col items-start md:w-1/3">
      <div class="flex items-center">
        <img class="w-10" src="../../assets/NoBackground.png" alt="" />
        <h1 class="text-lg font-bold uppercase font-serif">Ag-glowsense</h1>
      </div>
      <div>
        <p>
          Skincare products, natural, safe and effective. Handmade with the love
          of our customers in mind.
        </p>
        <p class="font-bold">&copy;{{ currentYear }} Copyright.</p>
        <p>All Rights Reserved.</p>
      </div>
    </div>
    <nav
      class="flex md:justify-around gap-y-6 items-center justify-start md:w-1/3"
    >
      <div class="flex flex-col justify-center">
        <RouterLink class="linkStyles" active-class="active" to="/"
          >Home</RouterLink
        >
        <RouterLink class="linkStyles" active-class="active" to="/about"
          >About</RouterLink
        >
        <RouterLink class="linkStyles" active-class="active" to="/products"
          >Products</RouterLink
        >
      </div>
      <div
        class="flex flex-col justify-between"
        v-if="userData.user"
      >
        <RouterLink to="/cart" class="linkStyles">Cart</RouterLink>
        <RouterLink to="/contacts" class="linkStyles">Contact Us</RouterLink>
      </div>
      <div
        class="flex flex-col justify-between"
        v-if="!userData.user"
      >
        <RouterLink to="/signup" class="linkStyles">Sign Up</RouterLink>
        <RouterLink to="/login" class="linkStyles">Log In</RouterLink>
      </div>
    </nav>
    <nav class="flex flex-col gap-6 md:justify-center items-start md:w-1/3">
      <h3>Follow us on our social platforms</h3>
      <div class="flex gap-2 items-center">
        <a
          href="https://web.facebook.com/profile.php?id=100057287476364"
          target="_blank"
          id="facebook"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
          >
            <path
              fill="#6c4a4a"
              d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"
            />
          </svg>
        </a>
        <a
          href="https://www.instagram.com/ag_glowsense/"
          target="_blank"
          id="instagram"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
          >
            <path
              fill="#6c4a4a"
              d="M13.028 2.001a78.82 78.82 0 0 1 2.189.022l.194.007c.224.008.445.018.712.03c1.064.05 1.79.218 2.427.465c.66.254 1.216.598 1.772 1.154a4.908 4.908 0 0 1 1.153 1.771c.247.637.415 1.364.465 2.428c.012.266.022.488.03.712l.006.194a79 79 0 0 1 .023 2.188l.001.746v1.31a78.836 78.836 0 0 1-.023 2.189l-.006.194c-.008.224-.018.445-.03.712c-.05 1.064-.22 1.79-.466 2.427a4.884 4.884 0 0 1-1.153 1.772a4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465c-.267.012-.488.022-.712.03l-.194.006a79 79 0 0 1-2.189.023l-.746.001h-1.309a78.836 78.836 0 0 1-2.189-.023l-.194-.006a60.64 60.64 0 0 1-.712-.03c-1.064-.05-1.79-.22-2.428-.466a4.89 4.89 0 0 1-1.771-1.153a4.904 4.904 0 0 1-1.154-1.772c-.247-.637-.415-1.363-.465-2.427a74.367 74.367 0 0 1-.03-.712l-.005-.194A79.053 79.053 0 0 1 2 13.028v-2.056a78.82 78.82 0 0 1 .022-2.188l.007-.194c.008-.224.018-.446.03-.712c.05-1.065.218-1.79.465-2.428A4.88 4.88 0 0 1 3.68 3.68a4.897 4.897 0 0 1 1.77-1.155c.638-.247 1.363-.415 2.428-.465l.712-.03l.194-.005A79.053 79.053 0 0 1 10.972 2h2.056Zm-1.028 5A5 5 0 1 0 12 17a5 5 0 0 0 0-10Zm0 2A3 3 0 1 1 12.001 15a3 3 0 0 1 0-6Zm5.25-3.5a1.25 1.25 0 0 0 0 2.498a1.25 1.25 0 0 0 0-2.5Z"
            />
          </svg>
        </a>
      </div>
      <div class="flex items-center gap-2">
        <img
          src="../../assets/call.svg"
          alt=""
          class="bg-[#6c4a4a] p-1 rounded-full"
        />
        <p>+234811 300 5790</p>
      </div>
      <div class="flex items-center gap-2">
        <img
          src="../../assets/email.svg"
          alt=""
          class="bg-[#6c4a4a] p-1 rounded-full"
        />
        <p>ag.glowsense@gmail.com</p>
      </div>
    </nav>
  </footer>
</template>

<script setup>
import { useUserStore } from "../../store/user";
const userData = useUserStore();

const currentYear = new Date().getFullYear();
</script>

<style scoped>
footer {
  background-color: #fdf6f0;
}
</style>
