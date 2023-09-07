<template>
  <div v-for="(item, index) in storeCount.allData" :key="index">
    <section
      v-if="storeCount.boardInfo.selectedTabIndex === index"
      class="content__container"
    >
      <h3 class="tab__title" v-if="!storeCount.showAside">
        {{ item.boardName }}
      </h3>

      <div class="row__container">
        <div v-for="(tasks, index) in item.taskRow" :key="index">
          <div class="task__column">
            <p class="col__name">{{ index }} ({{tasks.length}})</p>
            <div class="task__card">
              <h3>Build UI for search</h3>
              <p>0 of 1 subtask</p>
            </div>
            <div class="task__card">
              <h3>Build UI for search</h3>
              <p>0 of 1 subtask</p>
            </div>
          </div>
        </div>
        <div
          class="create__new-col"
          @click="
            storeCount.openModal('Create Board Column', 'create-board-column')
          "
        >
          <i class="fa-solid fa-plus"></i> <span> New Column</span>
        </div>
      </div>
    </section>
  </div>
</template>



<script setup>
import { useCounterStore } from "@/stores/counter";
const storeCount = useCounterStore(); // get reference to our store
</script>

<style lang="scss" scoped>
.content__container {
  width: 100%;
  height: calc(100vh - 110px);
  padding: 20px;
  .tab__title {
    color: var(--primary);
  }
  .row__container {
    display: flex;
    gap: 20px;
    width: 100%;
    padding-bottom: 50px;
    .task__column {
      width: 280px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      .col__name {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 2.4px;
        color: var(--grey);
        margin-bottom: 24px;
      }
      .task__card {
        border-radius: 8px;
        box-shadow: -1px 1px 10px 1px rgba(102, 96, 195, 0.75);
        padding: 20px 15px;
        background: var(--bg2);
        cursor: pointer;
        h3 {
          font-size: 16px;
          font-weight: 700;
          color: var(--white);
          transition: 0.3s ease;
          overflow: hidden;
        }
        p {
          color: var(--grey);
          font-size: 14px;
          font-weight: 700;
          margin: 0;
        }
        &:hover {
          h3 {
            color: var(--primary);
          }
        }
      }
    }
    .create__new-col {
      width: 280px;
      height: 200px;
      margin-top: 60px;
      padding: 20px 15px;
      background: var(--bg2);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      transition: 0.3s ease;
      cursor: pointer;
      i {
        font-size: 20px;
        margin-right: 10px;
        color: var(--grey);
        transition: 0.3s ease;
      }
      span {
        font-size: 25px;
        font-weight: 700;
        color: var(--grey);
        transition: 0.3s ease;
      }
      &:hover {
        box-shadow: -1px 1px 10px 1px rgba(102, 96, 195, 0.75);
        i,
        span {
          color: var(--primary);
        }
      }
    }
  }
}

@media (max-width: 767px) {
}
</style>