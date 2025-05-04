<template>
  <Form
    :validation-schema="schema"
    @submit="submitForm"
    class="w-[80%] md:w-[65%] lg:w-[50%]"
  >
    <Button
      @click="loginWithGoogle"
      class="bg-gray-900 p-3 gap-4 flex items-center justify-center text-white hover:bg-gray-700 duration-150 w-full mt-4"
    >
      <img src="../../assets/google.svg" alt="Google" />
      Signup with Google
    </Button>

    <div class="my-3 grid grid-cols-2 gap-4">
      <div class="col-span-2 md:col-span-1">
        <label for="firstName" class="text-2xl text-white">First Name</label>
        <Field
          name="firstName"
          id="firstName"
          class="rounded-md text-xl shadow-sm p-3 outline-red-400 shadow-red-400 w-full"
          placeholder="enter your first name"
        />
        <ErrorMessage name="firstName" class="text-red-300 text-sm" />
      </div>

      <div class="col-span-2 md:col-span-1">
        <label for="lastName" class="text-2xl text-white">Last Name</label>
        <Field
          name="lastName"
          id="lastName"
          class="rounded-md text-xl shadow-sm p-3 outline-red-400 shadow-red-400 w-full"
          placeholder="enter your last name"
        />
        <ErrorMessage name="lastName" class="text-red-300 text-sm" />
      </div>

      <div class="col-span-2 md:col-span-1">
        <label for="phoneNumber" class="text-2xl text-white"
          >Phone Number</label
        >
        <Field name="phoneNumber" v-slot="{ field }">
          <vue-tel-input
            v-bind="field"
            :inputOptions="{
              placeholder: 'enter your phone number',
            }"
            class="p-2 !border-red-400 !border w-full"
            :only-countries="['NG']"
          />
        </Field>
        <ErrorMessage name="phoneNumber" class="text-red-300 text-sm" />
      </div>

      <div class="col-span-2 md:col-span-1">
        <label for="email" class="text-2xl text-white">Email Address</label>
        <Field
          name="email"
          type="email"
          id="email"
          class="rounded-md text-xl shadow-sm p-3 outline-red-400 shadow-red-400 w-full"
          placeholder="enter your email address"
        />
        <ErrorMessage name="email" class="text-red-300 text-sm" />
      </div>

      <div class="col-span-2 relative">
        <label for="password" class="text-2xl text-white">Password</label>
        <Field
          :type="showPassword ? 'text' : 'password'"
          name="password"
          id="password"
          class="text-xl shadow-sm p-3 outline-red-400 shadow-red-400 rounded-md w-full"
          placeholder="enter your password"
        />
        <img
          src="../../assets/eye.svg"
          alt="Show Password"
          class="w-[30px] absolute right-4 top-[70%] transform -translate-y-1/2 cursor-pointer"
          @click="toggleVisibility"
          v-if="!showPassword"
        />
        <img
          src="../../assets/closedEye.svg"
          alt="Hide Password"
          class="w-[30px] absolute right-4 top-[70%] transform -translate-y-1/2 cursor-pointer"
          @click="toggleVisibility"
          v-else
        />
        <ErrorMessage name="password" class="text-red-300 text-sm" />
      </div>
    </div>

    <Button
      type="submit"
      class="bg-red-400 p-3 text-white hover:bg-red-500 duration-150 w-full mt-4"
    >
      {{ buttonText }}
    </Button>
  </Form>
</template>

<script setup>
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";
import Button from "./Button.vue";
import { useGoogle } from "../../composables/useGoogle";

const { loginWithGoogle } = useGoogle();
defineProps(["buttonText"]);
const emit = defineEmits(["submitForm"]);
const showPassword = ref(false);
// Function to toggle password visibility
const toggleVisibility = () => {
  showPassword.value = !showPassword.value;
};
// Validation schema for the form
const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
// function to handle form submission
const submitForm = (values) => {
  emit(
    "submitForm",
    values.email,
    values.password,
    values.firstName,
    values.lastName,
    values.phoneNumber
  );
};
</script>

<style scoped>
.vti__dropdown {
  background-color: aliceblue;
}
</style>
