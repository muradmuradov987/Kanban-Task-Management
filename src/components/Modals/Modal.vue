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
            @click="storeCount.toggleEditTaskMenu()"
            v-if="storeCount.modal.name === 'open-task'"
          ></i>
          <i class="fa-solid fa-xmark" @click="storeCount.closeModal"></i>

          <div class="edit__task-menu" v-if="storeCount.showEditTaskMenu">
            <span
              class="editTask"
              @click="
                storeCount.openModal(
                  'Edit Task',
                  'edit-task',
                  storeCount.taskDetail,
                  storeCount.tasksColName
                )
              "
              >Edit Task</span
            >
            <span
              class="deleteTask"
              @click="
                storeCount.openModal(
                  'Delete this task?',
                  'delete-task',
                  storeCount.taskDetail,
                  storeCount.tasksColName
                )
              "
              >Delete Task</span
            >
          </div>
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
    storeCount.resetData();
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
  display: flex;
  align-items: center;
  justify-content: center;
  .modal__container {
    max-width: 500px;
    width: 500px;
    max-height: 750px;
    overflow-y: auto;
    background: var(--bg2);
    z-index: 5;
    border-radius: 14px;
    &::-webkit-scrollbar {
      display: none;
    }
    .modal__header {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      .modal__title {
        color: var(--white);
      }
      .modal__edit {
        display: flex;
        position: relative;
        i {
          color: var(--white);
          font-size: 20px;
          margin-left: 20px;
          cursor: pointer;
        }
        .edit__task-menu {
        width: 130px;
        background: var(--bg2);
        position: absolute;
        right: 0px;
        border: 1px solid var(--primary);
        box-shadow: -1px 1px 10px 1px rgba(102, 96, 195, 0.75);
        border-radius: 10px;
        padding: 20px 10px;
        top: calc(100% + 10px);
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 5;
        .editTask {
          color: var(--grey);
          cursor: pointer;
        }
        .deleteTask {
          color: var(--red);
          cursor: pointer;
        }
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
      width: 100%;
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
