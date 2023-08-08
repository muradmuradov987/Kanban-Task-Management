<template>
  <div class="dasboard__container">
    <Navbar />
    <h1>{{storeCount.modal.showModal}}</h1>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
import { useRouter } from "vue-router"; //import router
import Navbar from "@/components/Navbar.vue";

const storeCount = useCounterStore(); // get reference to our store
const router = useRouter(); // get reference to our vue router
</script>

<style lang="scss" scoped>
.dasboard__container {
  min-height: 100vh;
  background: var(--bg);
}
h1{
  color: red;
}
</style>
