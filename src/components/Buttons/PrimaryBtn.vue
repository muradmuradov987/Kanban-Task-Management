<template>
  <button :style="{ width: buttonWidth, background:background, color: color  }" class="loginBtn" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup>
import { defineProps } from "vue";

const { buttonWidth, background,color, onClick } = defineProps(["buttonWidth","background","color", "onclick"]);

const handleClick = () => {
  if (typeof onClick === "function") {
    onClick();
  }
};
</script>

<style lang="scss" scoped>
.loginBtn {
  margin: 30px 0;
  padding: 10px;
  border-radius: 8px;
  background: var(--primary);
  color: var(--white);
  border: none;
  font-weight: 500;
  transition: 0.3s ease;
  &:hover {
    box-shadow: -1px 3px 10px 2px rgba(102, 96, 195, 0.75);
  }
}
</style>
