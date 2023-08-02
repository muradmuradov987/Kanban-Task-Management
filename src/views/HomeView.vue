<template>
  <h1>Home</h1>
  <h1>{{ storeCount.token }}</h1>
  <button @click="logOut">LogOut</button>
</template>

<script setup>

import { useCounterStore } from "@/stores/counter";
import { useRouter } from "vue-router"; //import router
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";


const storeCount = useCounterStore(); // get reference to our store
const router = useRouter(); // get reference to our vue router
const logOut = () => {
  signOut(getAuth()).then(() => {
    router.push("/login");
  });
};
</script>
