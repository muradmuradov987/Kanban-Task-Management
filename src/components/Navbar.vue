<template>
  <!--MODALS-->
  <Modal>
    <template #default>
      <!--Add New Task-->
      <div v-if="storeCount.modal.name == 'add-new-task'" class="add-new-task">
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
    </template>
  </Modal>

  <!--NAVBAR-->
  <div class="nav">
    <Logo />
    <h3 class="nav__title">Platform Launch</h3>
    <div class="nav__right">
      <PrimaryBtn
        class="addTaskBtn"
        @click="storeCount.openModal('Add New Task', 'add-new-task')"
        ><i class="fa-solid fa-plus"></i> <span>Add New Task</span></PrimaryBtn
      >
      <div class="profile" @click="toggleProfile">
        MM
        <div class="profile__menu" v-if="showProfileMenu">
          <span class="username">Murad Muradov</span>
          <RouterLink to="/dashboard"
            ><i class="fa-solid fa-gear"></i>Settings</RouterLink
          >
          <a href="" @click="logOut"
            ><i class="fa-solid fa-right-from-bracket"></i>Logout</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCounterStore } from "@/stores/counter";
import { useRouter } from "vue-router"; //import router
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Logo from "@/components/Logo.vue";
import PrimaryBtn from "@/components/Buttons/PrimaryBtn.vue";
import Modal from "@/components/Modals/Modal.vue";

const router = useRouter(); // get reference to our vue router
const storeCount = useCounterStore(); // get reference to our store

const showProfileMenu = ref(false);
const toggleProfile = () => {
  showProfileMenu.value = !showProfileMenu.value;
};

//Log out profile
const logOut = () => {
  signOut(getAuth()).then(() => {
    router.push("/login");
  });
};
</script>

<style lang="scss" scoped>
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
.nav {
  padding: 20px;
  background: var(--bg2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  .nav__title {
    color: var(--white);
    margin: 0;
  }
  .nav__right {
    display: flex;
    align-items: center;
    .addTaskBtn {
      margin: 0;
      span {
        margin-left: 10px;
      }
    }
    .profile {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary);
      font-size: 18px;
      margin-left: 20px;
      cursor: pointer;
      transition: 0.3s ease;
      position: relative;
      .profile__menu {
        width: 250px;
        background: var(--bg2);
        position: absolute;
        right: 0px;
        border: 1px solid var(--primary);
        border-radius: 10px;
        padding: 10px 0px;
        top: calc(100% + 30px);
        display: flex;
        flex-direction: column;
        z-index: 5;
        .username {
          padding: 10px;
          text-align: center;
          font-size: 20px;
          color: var(--primary);
        }
        a {
          text-decoration: none;
          padding: 5px 10px;
          display: flex;
          align-items: center;
          color: var(--primary);
          &:hover {
            color: white;
          }
          i {
            margin-right: 10px;
          }
        }
      }
    }
  }
}

@media (max-width: 767px) {
  .add-new-task {
    .form__control {
      .form__label {
        font-size: 14px;
        margin-bottom: 5px;
      }
      .form__input {
        height: 35px;
        border-radius: 6px;
        padding: 10px 20px;
        font-size: 14px;
      }
      .form__textarea {
        height: 110px;
        border-radius: 6px;
        padding: 20px;
        font-size: 14px;
      }
      .form__select {
        height: 35px;
        border-radius: 6px;
        outline: none;
        font-size: 14px;
      }
    }
  }
  .nav {
    padding: 10px 20px;
    .nav__title {
      display: none;
    }
    .nav__right {
      display: flex;
      align-items: center;
      .addTaskBtn {
        padding: 5px 10px;
        span {
          display: none;
        }
      }
      .profile {
        width: 40px;
        height: 40px;
        font-size: 14px;
        margin-left: 10px;
        .profile__menu {
          width: 200px;
          border-radius: 6px;
          top: calc(100% + 20px);
          .username {
            padding: 0px;
            margin-bottom: 5px;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
