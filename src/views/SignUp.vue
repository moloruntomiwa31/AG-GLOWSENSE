<template>
  <div class="flex flex-col justify-center items-center min-h-[100vh] signUp">
    <h1 class="text-4xl font-bold text-[#fff]">Sign Up</h1>
    <RegisterForm @submitForm="submitForm" :buttonText="buttonText" />
    <p class="text-white md:text-xl my-3">
      Already signned up?
      <RouterLink to="/login" class="underline text-red-400">Log In</RouterLink>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user";
import { useToast } from "../store/toast";
import { useRouter } from "vue-router";
import { RouterLink } from "vue-router";
import RegisterForm from "../components/fixed/RegisterForm.vue";
const userData = useUserStore();
const toast = useToast();
const router = useRouter();
const buttonText = ref("Sign Up");
// submit
const submitForm = (email, password, firstName, lastName, phoneNumber) => {
  signUp(email, password, firstName, lastName, phoneNumber);
};
// submit the form and sign up the user
const signUp = async (email, password, firstName, lastName, phoneNumber) => {
  try {
    await userData.signUp(email, password, firstName, lastName, phoneNumber);
    router.push("/");
  } catch (e) {
    toast.addToast(e.message.split(":")[1], "error");
  }
};
</script>

<style scoped>
.signUp {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)),
    url("../assets/signin.avif");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
