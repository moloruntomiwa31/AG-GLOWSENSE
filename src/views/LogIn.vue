<template>
  <div class="flex flex-col justify-center items-center min-h-[100vh] logIn">
    <h1 class="text-4xl font-bold text-white">Log in</h1>

    <Form
      class="w-[80%] md:w-[65%] lg:w-[50%]"
      :validation-schema="schema"
      @submit="submitForm"
    >
      <Button
        @click="loginWithGoogle"
        type="button"
        class="bg-gray-900 p-3 gap-4 flex items-center justify-center text-white hover:bg-gray-700 duration-150 w-full mt-4"
      >
        <img src="../assets/google.svg" alt="google" />
        Continue with Google
      </Button>

      <div class="my-3 grid grid-cols-2 gap-4">
        <!-- Email -->
        <div class="col-span-2">
          <label for="email" class="text-2xl text-white">Email Address</label>
          <Field
            name="email"
            type="email"
            id="email"
            class="rounded-md text-xl shadow-sm p-3 outline-red-400 shadow-red-400 w-full"
            placeholder="enter your email address"
          />
          <ErrorMessage name="email" class="text-red-300 text-sm mt-1 block" />
        </div>

        <!-- Password -->
        <div class="col-span-2 relative">
          <label for="password" class="text-2xl text-white">Password</label>
          <Field
            :type="showPassword ? 'text' : 'password'"
            name="password"
            id="password"
            class="text-xl shadow-sm p-3 outline-red-400 shadow-red-400 rounded-md w-full"
            placeholder="enter your password"
          />
          <ErrorMessage
            name="password"
            class="text-red-300 text-sm mt-1 block"
          />
          <img
            src="../assets/eye.svg"
            alt="Show Password"
            class="w-[30px] absolute right-4 top-[70%] transform -translate-y-1/2 cursor-pointer"
            @click="toggleVisibility"
            v-if="!showPassword"
          />
          <img
            src="../assets/closedEye.svg"
            alt="Hide Password"
            class="w-[30px] absolute right-4 top-[70%] transform -translate-y-1/2 cursor-pointer"
            @click="toggleVisibility"
            v-else
          />
        </div>
      </div>

      <Button
        type="submit"
        class="bg-red-400 p-3 text-white hover:bg-red-500 duration-150 w-full mt-4"
      >
        {{ buttonText }}
      </Button>
    </Form>

    <p class="text-white md:text-xl my-3">
      Don't have an account?
      <RouterLink to="/signup" class="underline text-red-300"
        >Sign Up</RouterLink
      >
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useUserStore } from "../store/user";
import { useToast } from "../store/toast";
import { useGoogle } from "../composables/useGoogle";
import Button from "../components/fixed/Button.vue";
// states
const userData = useUserStore();
const router = useRouter();
const toast = useToast();
const buttonText = ref("Log In");
const showPassword = ref(false);

const { loginWithGoogle } = useGoogle();

// validation schema for the form
const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
// submit the form and log in the user
const submitForm = async (values) => {
  try {
    await userData.logIn(values.email, values.password);
    router.push("/");
  } catch (e) {
    toast.addToast(e.message.split(":")[1], "error");
  }
};
// toggle the visibility of the password
const toggleVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped>
.logIn {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)),
    url("../assets/login.avif");
  background-position: left;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
