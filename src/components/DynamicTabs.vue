<template>
  <div class="content__container">
    <div v-for="(item, index) in storeCount.allData" :key="index">
      <h1 v-if="storeCount.tabInfo.selectedTabIndex === index">
        {{ item.tabName }} {{ index }}
      </h1>
    </div>
  </div>
</template>



<script setup>
import { useCounterStore } from "@/stores/counter";
const storeCount = useCounterStore(); // get reference to our store
</script>

<style scoped>
.content__container {
  padding: 20px;
  height: 100%;
}
h1 {
  color: red;
}
</style>