<template>
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
