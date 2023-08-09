<template>
  <div class="dasboard__container">
    <Navbar />
    <main>
      <aside>
        <h6 class="board__number">ALL BOARDS (3)</h6>
        <RouterLink to="/test">Create an account</RouterLink>
      </aside>
      <div>
        <RouterView />
      </div>
    </main>
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
  position: relative;
  main {
    display: flex;
    aside {
      width: 15%;
      height: calc(100vh - 90px);
      background: var(--bg2);
      padding: 20px;
      .board__number {
        color: var(--grey);
      }
    }
  }
}
</style>
