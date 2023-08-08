<template>
  <!--MODALS-->
  <Modal >
    <template> My Modal </template>
    <template> My Modals </template>
  </Modal>
  <!--NAVBAR-->
  <div class="nav">
    <Logo />
    <h3 class="nav__title">Platform Launch</h3>
    <div class="nav__right">
      <button class="addTaskBtn" @click="openNewTask()">
        <i class="fa-solid fa-plus"></i> Add New Task
      </button>
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
import { useRouter } from "vue-router"; //import router
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Logo from "@/components/Logo.vue";
import Modal from "@/components/Modals/Modal.vue";

const router = useRouter(); // get reference to our vue router

const showProfileMenu = ref(false);
const toggleProfile = () => {
  showProfileMenu.value = !showProfileMenu.value;
};

//Open modal
const openNewTask = (name, title) => {
  modal.value.showModal = true;
  // modal.value.name = name;
  // modal.value.title = title;
};
//Close modal
const closeModal = () => {
  modal.value.showModal = false;
  // modal.value.name = "";
  // modal.value.title = "";
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
      border: none;
      border-radius: 20px;
      padding: 10px 20px;
      color: var(--white);
      background: var(--primary);
      font-size: 18px;
      transition: 0.3s ease;
      &:hover {
        box-shadow: -1px 3px 10px 2px rgba(102, 96, 195, 0.75);
      }
      i {
        margin-right: 10px;
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
</style>
