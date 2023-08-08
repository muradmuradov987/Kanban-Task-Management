<template>
  <div class="modal__backdrop"  @click="handleBackdropClick">
    <div class="modal__container">
      <div class="modal__header">
        <h5 class="modal__title">{{ storeCount.modal.title }}</h5>
        <div class="modal__edit">
          <!-- <i class="fa-solid fa-pen-to-square"></i> -->
          <i class="fa-solid fa-xmark" @click="handleClick"></i>
        </div>
      </div>
      <div class="modal__body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
import { useCounterStore } from "@/stores/counter";
const storeCount = useCounterStore(); // get reference to our store

// import { defineProps } from "vue";

// const { onClick } = defineProps(["onclick"]);

// const handleClick = () => {
//   if (typeof onClick === "function") {
//     onClick();
//   }
// };


const handleClick = () => {
  showModal.value = false;
};

const handleBackdropClick = (event) => {
  if (event.target === event.currentTarget) {
    showModal.value = false;
  }
};

</script>


<style lang="scss" scoped>
.modal__backdrop {
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.55);
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  .modal__container {
    max-width: 500px;
    width: 500px;
    background: var(--bg2);
    z-index: 5;
    border-radius: 14px;
    .modal__header {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      .modal__title {
        color: var(--white);
      }
      .modal__edit {
        display: flex;
        i {
          color: var(--white);
          font-size: 20px;
          margin-left: 20px;
          cursor: pointer;
        }
      }
    }
    .modal__body {
      padding: 20px;
      padding-top: 0;
    }
  }
}
</style>
