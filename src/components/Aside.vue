<template>
  <aside v-if="storeCount.showAside">
    <div class="board__link-container">
      <h6 class="board__number">ALL BOARDS (3)</h6>
      <div
        class="board__link"
        v-for="(tab, index) in storeCount.allData"
        :key="index"
        :class="{ active__link: storeCount.tabInfo.selectedTabIndex === index }"
        @click="storeCount.selectTab(index)"
      >
        <i class="fa-solid fa-bolt"></i><span>{{ tab.tabName }}</span>
      </div>

      <PrimaryBtn
        class="createNewBoardBtn"
        background="var(--white)"
        color="var(--primary)"
        buttonWidth="auto"
        @click="storeCount.openModal('Create New Board', 'create-new-board')"
        ><i class="fa-solid fa-plus me-2"></i>
        <span>Create New Board</span></PrimaryBtn
      >
    </div>
    <div class="aside__footer">
      <div class="theme__toggle">
        <i class="fa-solid fa-sun"></i>
        <input type="checkbox" checked class="themeBtn" />
        <i class="fa-solid fa-moon"></i>
      </div>
      <div class="hide__sidebar" @click="storeCount.hideSidebar">
        <i class="fa-regular fa-eye-slash"></i>Hide Sidebar
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, } from "vue";
import { useCounterStore } from "@/stores/counter";
import PrimaryBtn from "@/components/Buttons/PrimaryBtn.vue";

const storeCount = useCounterStore(); // get reference to our store

</script>



<style lang="scss" scoped>
aside {
  width: 20%;
  height: calc(100vh - 90px);
  background: var(--bg2);
  display: flex;
  flex-direction: column;
  gap: 20px;
  .board__link-container {
    padding: 20px;
    padding-left: 0;
    height: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--primary);
    }
    .board__number {
      color: var(--grey);
      margin-left: 20px;
    }
    .board__link {
      padding: 13px 20px;
      border-radius: 0 100px 100px 0;
      color: var(--grey);
      text-decoration: none;
      font-weight: 500;
      font-size: 18px;
      transition: 0.3s ease;
      overflow: hidden;
      cursor: pointer;
      display: flex;
      align-items: center;
      i {
        margin-right: 10px;
      }
      &:hover {
        background: var(--white);
        color: var(--primary);
      }
    }
    .active__link {
      background: var(--primary);
      color: var(--white);
    }
    .createNewBoardBtn {
      margin-left: 20px;
    }
  }
  .aside__footer {
    height: 20%;
    .theme__toggle {
      background: var(--bg);
      border-radius: 10px;
      margin: 0px 20px;
      padding: 10px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 25px;
      i {
        font-size: 20px;
        color: var(--grey);
      }
      .themeBtn {
        position: relative;
        width: 45px;
        height: 20px;
        -webkit-appearance: none;
        appearance: none;
        background: var(--primary);
        border-radius: 15px;
        cursor: pointer;
        transition: 0.3s ease;
        &::before {
          content: "";
          width: 20px;
          height: 20px;
          background: var(--white);
          border-radius: 50%;
          transition: 0.3s ease;
          position: absolute;
          left: 0;
        }
        &:checked {
          &::before {
            right: 0;
            transform: translateX(130%);
          }
        }
      }
    }
    .hide__sidebar {
      margin: 20px;
      text-align: center;
      padding: 10px 0;
      border-radius: 10px;
      color: var(--grey);
      cursor: pointer;
      font-weight: 500;
      background: var(--bg);
      font-size: 18px;
      transition: 0.3s ease-in-out;
      i {
        margin-right: 10px;
      }
      &:hover {
        background: var(--white);
        color: var(--primary);
      }
    }
  }
}

@media (max-width: 767px) {
  aside {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 70%;
    height: calc(100vh - 60px);
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    box-shadow: 2px 0px 10px 2px rgba(102, 96, 195, 0.75);
    .board__link-container {
      height: 80%;
      .board__number {
        font-size: 14px;
      }
      .board__link {
        padding: 10px 20px;
        font-size: 16px;
      }
    }
  }
}

@media (min-width: 768px) and (max-width: 1200px) {
  aside {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 40%;
    height: calc(100vh - 60px);
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    box-shadow: 2px 0px 10px 2px rgba(102, 96, 195, 0.75);
    .board__link-container {
      .board__number {
        font-size: 14px;
      }
      .board__link {
        padding: 10px 20px;
        font-size: 16px;
      }
    }
  }
}

@media (min-width: 1200px) and (max-width: 1350px) {
  aside {
    width: 40%;
  }
}
</style>