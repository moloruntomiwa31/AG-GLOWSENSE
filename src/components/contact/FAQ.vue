<template>
    <div class="grid place-items-center space-y-6 p-6">
        <div id="question-wrapper" v-for="(faq, index) in faqs" :key="faq" class="w-full md:w-1/2 p-2 duration-300 cursor-pointer select-none"
            @click="toggleFaq(index)">
            <div id="question" class="flex items-center justify-between bg-[#FDF6F0] p-2 rounded-md ">
                <p class="font-bold text-lg text-[#4d4141]">{{ faq.question }}</p>
                <svg v-if='faq.open' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g transform="rotate(90 12 12)">
                        <path fill="#c89595" fill-rule="evenodd"
                            d="m16.75 17l-7.5-5l7.5-5a.901.901 0 1 0-1-1.5l-8.502 5.668a1 1 0 0 0 0 1.664L15.75 18.5a.901.901 0 1 0 1-1.5z" />
                    </g>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g transform="rotate(-90 12 12)">
                        <path fill="#c89595" fill-rule="evenodd"
                            d="m16.75 17l-7.5-5l7.5-5a.901.901 0 1 0-1-1.5l-8.502 5.668a1 1 0 0 0 0 1.664L15.75 18.5a.901.901 0 1 0 1-1.5z" />
                    </g>
                </svg>
            </div>
            <Transition name="fade">
                <div id="answer" v-if="faq.open" class="block p-2">
                    <p>{{ faq.answer }}</p>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["faqs"])

const activeFaqIndex = ref(-1); 

const toggleFaq = (index) => {
  props.faqs[index].open = !props.faqs[index].open;

  if (activeFaqIndex.value !== -1 && activeFaqIndex.value !== index) {
    props.faqs[activeFaqIndex.value].open = false;
  }

  activeFaqIndex.value = props.faqs[index].open ? index : -1;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease-in;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>