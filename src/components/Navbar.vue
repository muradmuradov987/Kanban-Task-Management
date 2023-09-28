<template>
  <!--NAVBAR-->
  <div class="nav">
    <Logo />
    <h3 class="nav__title">Platform Launch</h3>
    <div class="nav__right">
      <div
        v-if="
          storeCount.allData[storeCount.boardInfo.selectedTabIndex]?.taskRow
            .length > 0
        "
      >
        <PrimaryBtn
          v-if="storeCount.allData.length > 0"
          class="addTaskBtn"
          @click="storeCount.openModal('Add New Task', 'add-new-task')"
          ><i class="fa-solid fa-plus"></i>
          <span>Add New Task</span></PrimaryBtn
        >
      </div>
      <div
        class="editBtn"
        @click="storeCount.toggleEditMenu"
        v-if="storeCount.allData.length > 0"
      >
        <i class="fa-solid fa-ellipsis-vertical"></i>
        <div class="edit__menu" v-if="storeCount.showEditMenu">
          <span
            class="editBoard"
            @click="storeCount.openModal('Edit board', 'edit-board')"
            >Edit board</span
          >
          <span
            class="deleteBoard"
            @click="storeCount.openModal('Delete this board?', 'delete-board')"
            >Delete board</span
          >
        </div>
      </div>
      <div class="profile" @click="storeCount.toggleProfile">
        MM
        <div class="profile__menu" v-if="storeCount.showProfileMenu">
          <span class="username">Username</span>
          <div class="menu__link">
            <div>
              <i class="fa-solid fa-gear"></i>
              <span>Settings</span>
            </div>
            <div @click="storeCount.openModal('About project', 'info')">
              <i class="fa-solid fa-info"></i>
              <span>Info</span>
            </div>
            <div @click="logOut">
              <i class="fa-solid fa-right-from-bracket"></i>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref } from "vue";
import { useCounterStore } from "@/stores/counter";
import { useRouter } from "vue-router"; //import router
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Logo from "@/components/Logo.vue";
import PrimaryBtn from "@/components/Buttons/PrimaryBtn.vue";

const router = useRouter(); // get reference to our vue router
const storeCount = useCounterStore(); // get reference to our store

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
    gap: 20px;
    .addTaskBtn {
      margin: 0;
      span {
        margin-left: 10px;
      }
    }
    .editBtn {
      cursor: pointer;
      position: relative;
      i {
        color: var(--primary);
        font-size: 30px;
      }
      .edit__menu {
        width: 130px;
        background: var(--bg2);
        position: absolute;
        right: 0px;
        border: 1px solid var(--primary);
        box-shadow: -1px 1px 10px 1px rgba(102, 96, 195, 0.75);
        border-radius: 10px;
        padding: 20px 10px;
        top: calc(100% + 40px);
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 5;
        .editBoard {
          color: var(--grey);
        }
        .deleteBoard {
          color: var(--red);
        }
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
      cursor: pointer;
      transition: 0.3s ease;
      position: relative;
      &:hover {
        box-shadow: -1px 1px 10px 1px rgba(102, 96, 195, 0.75);
      }
      .profile__menu {
        width: 250px;
        background: var(--bg2);
        position: absolute;
        right: 0px;
        border: 1px solid var(--primary);
        box-shadow: -1px 1px 10px 1px rgba(102, 96, 195, 0.75);
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
        .menu__link {
          padding: 5px 10px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          div {
            display: flex;
            align-items: center;
            transition: 0.3s ease;
            gap: 10px;
            i {
              width: 30px;
              text-align: center;
            }
            &:hover {
              color: white;
            }
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
