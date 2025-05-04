<template>
  <div
    class="flex flex-col md:flex-row justify-center mt-6 mb-6 mx-12"
    data-aos="fade-up"
  >
    <div
      class="w-full xl:w-[25%] grid place-items-center bg-[#FDF6F0] md:rounded-l-md p-4 rounded-t-md"
    >
      <div class="p-4 w-full space-y-8">
        <div class="space-y-3" v-for="details in contactDetails" :key="details">
          <h1 class="text-2xl">{{ details.title }}</h1>
          <div class="flex items-center space-x-2">
            <div class="p-2 rounded-full bg-red-300">
              <img :src="details.image" alt="product-image" />
            </div>
            <h3>{{ details.text }}</h3>
          </div>
        </div>
      </div>
    </div>
    <Form
      :validation-schema="schema"
      @submit="sendMail"
      class="bg-red-300 flex flex-col w-full xl:w-[40%] p-4 space-y-4 rounded-b-md md:rounded-r-md"
      ref="myForm"
    >
      <div class="flex flex-col md:flex-row gap-4">
        <div class="w-full grid">
          <Field
            name="name"
            type="text"
            class="contactStyles"
            placeholder="Your Name"
          />
          <ErrorMessage
            name="name"
            class="text-sm text-red-700 mt-1 transition-opacity duration-300 ease-in-out"
          />
        </div>

        <div class="w-full grid">
          <Field
            name="email"
            type="email"
            class="contactStyles"
            placeholder="Your Email"
          />
          <ErrorMessage
            name="email"
            class="text-sm text-red-700 mt-1 transition-opacity duration-300 ease-in-out"
          />
        </div>
      </div>

      <div class="grid">
        <Field
          name="subject"
          type="text"
          class="contactStyles"
          placeholder="Subject"
        />
        <ErrorMessage
          name="subject"
          class="text-sm text-red-700 mt-1 transition-opacity duration-300 ease-in-out"
        />
      </div>

      <div class="grid">
        <Field
          as="textarea"
          name="message"
          class="resize-none contactStyles"
          cols="30"
          rows="10"
          placeholder="Message"
        />
        <ErrorMessage
          name="message"
          class="text-sm text-red-700 mt-1 transition-opacity duration-300 ease-in-out"
        />
      </div>

      <button
        class="capitalize p-4 bg-black shadow-md rounded-md text-white w-fit mx-auto"
      >
        {{ isSending ? "Sending..." : "Send Message" }}
      </button>
    </Form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import emailjs from "@emailjs/browser";
import { useToast } from "../../store/toast";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Please enter your name."),
  email: yup
    .string()
    .email("Enter a valid email address.")
    .required("Your email is required."),
  subject: yup.string().required("Subject cannot be empty."),
  message: yup.string().required("Message cannot be empty."),
});

//props
defineProps(["contactDetails"]);

const myForm = ref(null);
const toast = useToast();
const isSending = ref(false);

const sendMail = async (values) => {
  try {
    isSending.value = true;
    const result = await emailjs.sendForm(
      "service_v9lj3tl",
      "template_hw6t3tc",
      myForm.value.$el,
      "4YgbtiZFpG5UQpivl"
    );
    if (result.status === 200 || result.text === "OK") {
      toast.addToast("Message sent successfully", success);
    }
  } catch (error) {
    toast.addToast("Message not sent", error);
  } finally {
    isSending.value = false;
    myForm.value.resetForm();
  }
};
</script>

<style scoped></style>
