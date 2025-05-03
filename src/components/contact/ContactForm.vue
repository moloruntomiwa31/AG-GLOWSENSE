<template>
    <div class="flex flex-col md:flex-row justify-center mt-6 mb-6 mx-12">
        <div class="w-full xl:w-[25%] grid place-items-center bg-[#FDF6F0] md:rounded-l-md p-4 rounded-t-md">
            <div class="p-4 w-full space-y-8">
                <div class="space-y-3" v-for="details in contactDetails" :key="details">
                    <h1 class="text-2xl">{{ details.title }}</h1>
                    <div class="flex items-center space-x-2">
                        <div class="p-2 rounded-full bg-red-300">
                            <img :src="details.image" alt="product-image">
                        </div>
                        <h3>{{ details.text }}</h3>
                    </div>
                </div>
            </div>
        </div>
        <form class="bg-red-300 flex flex-col w-full xl:w-[40%] p-4 space-y-4 rounded-b-md md:rounded-r-md"
            @submit.prevent="sendMail" ref="myForm">
            <div class="flex justify-between flex-col md:flex-row space-y-4 md:space-y-0">
                <input type="text" class="contactStyles" placeholder="Your Name" required v-model="state.name">

                <input type="email" class="contactStyles" placeholder="Your Email" required v-model="state.email">

            </div>
            <input type="text" class="contactStyles" placeholder="Subject" required v-model="state.subject">

            <textarea name="" id="" cols="30" rows="10" class="resize-none contactStyles" required placeholder="Message"
                v-model="state.message"></textarea>

            <div v-if="v$.$errors.length">
                <p v-for="error in v$.$errors">{{ error }}</p>
            </div>

            <div class="grid place-items-center my-2">
                <Button class="capitalize p-4 bg-black shadow-md rounded-md text-white">Send Message</Button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import emailjs from "@emailjs/browser"
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import Button from '../fixed/Button.vue';

//props
defineProps(["contactDetails"])

//form refrence
const myForm = ref(null)

//form validation
const state = reactive({
    name: '',
    email: '',
    subject: '',
    message: ''
})

const rules = {
    name: { required }, 
    subject: { required }, 
    email: { required, email }, 
    message: { required }
}
const v$ = useVuelidate(rules, state)

//sendMail
const sendMail = async () => {
    console.log('Validation state:', v$.value);
    if (v$.value.$invalid) {
        return;
    }

    const myFormElement = myForm.value
    const send = await emailjs.sendForm("service_v9lj3tl", "template_hw6t3tc", myFormElement, "4YgbtiZFpG5UQpivl")
    console.log(send.status);

}
</script>

<style scoped></style>