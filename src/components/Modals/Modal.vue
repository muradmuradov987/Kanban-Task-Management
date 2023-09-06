<template>
  <div
    class="modal__backdrop"
    v-if="storeCount.modal.show"
    @click="closeBackdrop"
  >
    <div class="modal__container">
      <div class="modal__header">
        <h5 class="modal__title">{{ storeCount.modal.title }}</h5>
        <div class="modal__edit">
          <i
            class="fa-solid fa-pen-to-square"
            v-if="storeCount.modal.editBtn"
          ></i>
          <i class="fa-solid fa-xmark" @click="storeCount.closeModal"></i>
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

const closeBackdrop = (e) => {
  if (e.target == e.currentTarget) {
    storeCount.closeModal();
    storeCount.resetData()
  }
};
</script>


<style lang="scss" scoped>
.modal__backdrop {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.55);
  top: 0;
  left: 0;
  z-index: 100;
  padding: 50px 20px;
  .modal__container {
    max-width: 500px;
    width: 500px;
    background: var(--bg2);
    z-index: 5;
    border-radius: 14px;
    margin: 0 auto;
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
@media (max-width: 767px) {
  .modal__backdrop {
    padding: 50px 20px;
    .modal__container {
      width: auto;
      border-radius: 7px;
      .modal__header {
        padding: 15px;
      }
      .modal__body {
        padding: 15px;
        padding-top: 0;
      }
    }
  }
}
</style>
