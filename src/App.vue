<template>
  <!-- <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <RouterView />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCounterStore } from "@/stores/counter";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
const storeCount = useCounterStore(); // get reference to our store

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (user) {
      storeCount.isLoggedIn = true;
    } else {
      storeCount.isLoggedIn = false;
    }
  });
});
</script>

<style scoped></style>
