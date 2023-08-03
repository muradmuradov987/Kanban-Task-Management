<template>
  <RouterView />
</template>

<script setup>
import { onMounted } from "vue";
import { useCounterStore } from "@/stores/counter";
import { getAuth, onAuthStateChanged} from "firebase/auth";
const storeCount = useCounterStore(); // get reference to our store

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      storeCount.isLoggedIn = true;
    } else {
      storeCount.isLoggedIn = false;
    }
  });
});
</script>

<style scoped></style>
