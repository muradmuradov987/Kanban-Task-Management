<template>
  <div class="dasboard__container">
    <!--All MODALS-->
    <Modal>
      <template #default>
        <!--Add New Task-->
        <div
          v-if="storeCount.modal.name == 'add-new-task'"
          class="add-new-task"
        >
          <div class="form__control">
            <label class="form__label">Task Name</label>
            <input
              class="form__input"
              type="text"
              placeholder="e.g.Take coffe break"
            />
          </div>
          <div class="form__control">
            <label class="form__label">Description</label>
            <textarea
              class="form__textarea"
              type="text"
              placeholder="e.g. It's always good to break. This 15 minute break will recharge the batteries a little"
            ></textarea>
          </div>
          <div class="form__control">
            <label class="form__label">Subtasks</label>
            <div class="subtask">
              <input class="form__input" type="text" />
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
          <div class="form__control">
            <div class="subtask">
              <input class="form__input" type="text" />
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
          <PrimaryBtn
            buttonWidth="100%"
            background="var(--white)"
            color="var(--primary)"
            ><i class="fa-solid fa-plus me-2"></i> Add New Subtask</PrimaryBtn
          >
          <div class="form__control">
            <label class="form__label">Current Status</label>
            <select class="form__select">
              <option value="">Todo</option>
              <option value="">Doing</option>
              <option value="">Done</option>
            </select>
          </div>
          <PrimaryBtn buttonWidth="100%" class="mb-0"> Create Task</PrimaryBtn>
        </div>
        <!--Add New Task end-->

        <!--Edit Board-->
        <div v-if="storeCount.modal.name == 'edit-board'" class="edit-board">
          <div class="form__control">
            <label class="form__label">Board Name</label>
            <input
              class="form__input"
              type="text"
              v-model="
                storeCount.allData[storeCount.boardInfo.selectedTabIndex]
                  .editBoardName
              "
            />
            <span
              class="input__info"
              v-if="storeCount.validationField.editBoardField"
              >Can't be empty</span
            >
          </div>
          <PrimaryBtn
            buttonWidth="100%"
            background="var(--primary)"
            color="var(--white)"
            @click="storeCount.saveEditBoard()"
          >
            Save Changes</PrimaryBtn
          >
        </div>
        <!--Edit Board end-->

        <!--Delete Board-->
        <div
          v-if="storeCount.modal.name == 'delete-board'"
          class="delete-board"
        >
          <p class="deleteInfo">
            Are you sure you want to delete the "Platform Launch" board? This
            action will remove all columns and tasks and cannot be reversed.
          </p>
          <div class="btnsGroup">
            <PrimaryBtn
              buttonWidth="100%"
              background="var(--red)"
              color="var(--white)"
              @click="storeCount.deleteBoard"
            >
              Delete</PrimaryBtn
            >
            <PrimaryBtn
              buttonWidth="100%"
              background="var(--primary)"
              color="var(--white)"
              @click="storeCount.closeModal()"
            >
              Cancel</PrimaryBtn
            >
          </div>
        </div>
        <!--Delete Board end-->

        <!--Create New Board-->
        <div
          v-if="storeCount.modal.name == 'create-new-board'"
          class="add-new-tab"
        >
          <div class="form__control">
            <label class="form__label">Board Name</label>
            <input
              class="form__input"
              type="text"
              placeholder="e.g. Web Design"
              v-model="storeCount.boardInfo.boardName"
              @keydown.enter="
                storeCount.addBoard(storeCount.boardInfo.boardName)
              "
            />
            <span
              class="input__info"
              v-if="storeCount.validationField.boardField"
              >Can't be empty</span
            >
          </div>
          <PrimaryBtn
            buttonWidth="100%"
            background="var(--primary)"
            color="var(--white)"
            @click="storeCount.addBoard(storeCount.boardInfo.boardName)"
            ><i class="fa-solid fa-plus me-2"></i> Create New Board</PrimaryBtn
          >
        </div>
        <!--Create New Board end-->

        <!--Create New Board Column-->
        <div
          v-if="storeCount.modal.name == 'create-board-column'"
          class="add-new-tab"
        >
          <div class="form__control">
            <label class="form__label">Column Name</label>
            <input
              class="form__input"
              type="text"
              v-model="storeCount.colName"
              @keydown.enter="storeCount.addColumn()"
            />
            <span
              class="input__info"
              v-if="storeCount.validationField.columnField"
              >Can't be empty</span
            >
            <span class="input__info" v-if="storeCount.sameColname"
              >This column Name is already used</span
            >
          </div>
          <PrimaryBtn
            buttonWidth="100%"
            background="var(--primary)"
            color="var(--white)"
            @click="storeCount.addColumn()"
            ><i class="fa-solid fa-plus me-2"></i> Add New Column</PrimaryBtn
          >
        </div>
        <!--Create New Board Column end-->
      </template>
    </Modal>

    <Navbar />
    <main>
      <Aside />
      <div class="content">
        <DynamicTabs />
      </div>
    </main>
    <div
      class="openSidebar"
      @click="storeCount.openSidebar"
      v-if="!storeCount.showAside"
    >
      <i class="fa-regular fa-eye"></i>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
import { useRouter } from "vue-router"; //import router
import Navbar from "@/components/Navbar.vue";
import PrimaryBtn from "@/components/Buttons/PrimaryBtn.vue";
import Aside from "@/components/Aside.vue";
import Modal from "@/components/Modals/Modal.vue";
import DynamicTabs from "@/components/DynamicTabs.vue";
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
    position: relative;
    .content {
      width: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 10px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: var(--primary);
      }
    }
  }
  .openSidebar {
    width: 56px;
    height: 48px;
    border-radius: 0 100px 100px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s ease;
    background: var(--bg2);
    position: absolute;
    bottom: 30px;
    left: 0;
    z-index: 5;
    cursor: pointer;
    box-shadow: 2px 0px 10px 2px rgba(102, 96, 195, 0.75);
    i {
      color: var(--white);
    }
    &:hover {
      background: var(--white);
      i {
        color: var(--primary);
      }
    }
  }
}
//All Modals
.add-new-task {
  .form__control {
    margin-bottom: 10px;
    .form__label {
      color: var(--white);
      font-size: 14px;
      margin-bottom: 10px;
    }
    .form__input {
      width: 100%;
      height: 40px;
      border-radius: 8px;
      padding: 20px;
      outline: none;
      font-size: 16px;
      color: var(--primary);
      background: none;
      border: 1px solid var(--border);
      transition: 0.3s ease;
      &::placeholder {
        color: var(--border);
      }
      &:focus {
        border: 1px solid var(--primary);
      }
    }
    .form__textarea {
      width: 100%;
      height: 120px;
      border-radius: 8px;
      padding: 20px;
      outline: none;
      font-size: 16px;
      color: var(--primary);
      background: none;
      border: 1px solid var(--border);
      transition: 0.3s ease;
      resize: none;
      &::placeholder {
        color: var(--border);
      }
      &:focus {
        border: 1px solid var(--primary);
      }
    }
    .form__select {
      width: 100%;
      height: 40px;
      padding: 0px 20px;
      border-radius: 8px;
      outline: none;
      font-size: 16px;
      color: var(--primary);
      background: none;
      border: 1px solid var(--border);
      transition: 0.3s ease;
      &:focus {
        border: 1px solid var(--primary);
      }
      option {
        font-size: 14px;
        background: var(--bg);
        color: var(--white);
      }
    }
    .subtask {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      i {
        margin-left: 20px;
        font-size: 20px;
        cursor: pointer;
        color: var(--primary);
      }
    }
  }
}

.add-new-tab {
  .form__control {
    margin-bottom: 10px;
    .form__label {
      color: var(--white);
      font-size: 14px;
      margin-bottom: 10px;
    }
    .form__input {
      width: 100%;
      height: 40px;
      border-radius: 8px;
      padding: 20px;
      outline: none;
      margin-bottom: 10px;
      font-size: 16px;
      color: var(--primary);
      background: none;
      border: 1px solid var(--border);
      transition: 0.3s ease;
      &::placeholder {
        color: var(--border);
      }
      &:focus {
        border: 1px solid var(--primary);
      }
    }
    .input__info {
      color: var(--red);
      font-size: 14px;
    }
  }
}

.edit-board {
  .form__control {
    margin-bottom: 10px;
    .form__label {
      color: var(--white);
      font-size: 14px;
      margin-bottom: 10px;
    }
    .form__input {
      width: 100%;
      height: 40px;
      border-radius: 8px;
      padding: 20px;
      outline: none;
      margin-bottom: 10px;
      font-size: 16px;
      color: var(--primary);
      background: none;
      border: 1px solid var(--border);
      transition: 0.3s ease;
      &::placeholder {
        color: var(--border);
      }
      &:focus {
        border: 1px solid var(--primary);
      }
    }
    .input__info {
      color: var(--red);
      font-size: 14px;
    }
  }
}

.delete-board {
  .deleteInfo {
    color: var(--grey);
  }
  .btnsGroup {
    display: flex;
    gap: 70px;
  }
}

@media (max-width: 767px) {
  //All Modals
  .add-new-task {
    .form__control {
      margin-bottom: 10px;
      .form__label {
        font-size: 12px;
        margin-bottom: 5px;
      }
      .form__input {
        width: 100%;
        height: 35px;
        border-radius: 8px;
        padding: 10px;
        font-size: 14px;
      }
      .form__textarea {
        height: 80px;
        padding: 15px;
        font-size: 14px;
      }
      .form__select {
        height: 35px;
        padding: 0px 15px;
        outline: none;
        font-size: 14px;
      }
    }
  }
  .add-new-tab {
    .form__control {
      margin-bottom: 10px;
      .form__label {
        font-size: 12px;
        margin-bottom: 5px;
      }
      .form__input {
        width: 100%;
        height: 35px;
        border-radius: 8px;
        padding: 10px;
        font-size: 14px;
      }
    }
  }
}
</style>
