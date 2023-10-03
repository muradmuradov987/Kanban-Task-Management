<template>
  <div
    class="dasboard__container"
    :class="{ light: !storeCount.isThemeChecked }"
  >
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
              v-model="storeCount.newTaskInfo.taskName"
            />
            <span class="input__info" v-if="storeCount.validationField.taskName"
              >Can't be empty</span
            >
          </div>
          <div class="form__control">
            <label class="form__label">Description</label>
            <textarea
              class="form__textarea"
              type="text"
              placeholder="e.g. It's always good to break. This 15 minute break will recharge the batteries a little"
              v-model="storeCount.newTaskInfo.desc"
            ></textarea>
          </div>
          <div class="form__control" v-if="storeCount.tempSubTasks.length > 0">
            <label class="form__label">Subtasks</label>
            <div
              class="subtask"
              v-for="(item, index) in storeCount.tempSubTasks"
              :key="index"
            >
              <input
                class="form__input"
                type="text"
                v-model="item.subTaskValue"
              />
              <i
                class="fa-solid fa-xmark"
                @click="storeCount.deleteSubTask(index)"
              ></i>
            </div>
            <span class="input__info" v-if="storeCount.validationField.subTask"
              >Can't be empty</span
            >
          </div>
          <PrimaryBtn
            buttonWidth="100%"
            background="var(--white)"
            color="var(--primary)"
            @click="storeCount.addNewSubTask"
            v-if="storeCount.tempSubTasks.length > 0"
            ><i class="fa-solid fa-plus me-2"></i> Add New Subtask</PrimaryBtn
          >
          <div class="form__control">
            <label class="form__label">Add Status</label>
            <select class="form__select" v-model="storeCount.status">
              <option
                v-for="itemName in storeCount.allData[
                  storeCount.boardInfo.selectedTabIndex
                ].taskRow"
                :key="itemName.colName"
              >
                {{ itemName.colName }}
              </option>
            </select>
            <span
              class="input__info"
              v-if="storeCount.validationField.addStatus"
              >Can't be empty</span
            >
          </div>
          <PrimaryBtn
            buttonWidth="100%"
            class="mb-0"
            @click="storeCount.addNewTask()"
          >
            Create Task</PrimaryBtn
          >
        </div>
        <!--Add New Task end-->

        <!--Edit Board-->
        <div v-if="storeCount.modal.name == 'edit-board'" class="edit-board">
          <div class="form__control">
            <label class="form__label">Board Name</label>
            <input
              class="form__input mb-5"
              type="text"
              @keydown.enter="storeCount.saveEditBoard()"
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
          <div>
            <div class="form__control">
              <label
                class="form__label"
                v-if="
                  storeCount.allData[storeCount.boardInfo.selectedTabIndex]
                    .taskRow.length
                "
                >Board Columns</label
              >
              <div
                class="mb-3"
                v-for="(colList, index) in storeCount.allData[
                  storeCount.boardInfo.selectedTabIndex
                ].taskRow"
                :key="index"
              >
                <div class="col__list">
                  <input
                    class="form__input"
                    type="text"
                    v-model="colList.colName"
                  />
                  <i
                    class="fa-solid fa-xmark"
                    @click="storeCount.deleteColumn(index)"
                  ></i>
                </div>
              </div>
              <span
                class="input__info"
                v-if="storeCount.validationField.editColumnField"
                >Board columns can't be empty</span
              >
            </div>
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
            Are you sure you want to delete the
            <span class="deleteItem">
              "{{
                storeCount.allData[storeCount.boardInfo.selectedTabIndex]
                  .boardName
              }}"</span
            >
            board? This action will remove all columns and tasks and cannot be
            reversed.
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

        <!--Create New  Column-->
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
              @keydown.enter="storeCount.addNewColumn()"
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
            @click="storeCount.addNewColumn()"
            ><i class="fa-solid fa-plus me-2"></i> Add New Column</PrimaryBtn
          >
        </div>
        <!--Create New  Column end-->

        <!--Open Task Info-->
        <div v-if="storeCount.modal.name == 'open-task'" class="open-task">
          <div
            class="description__container"
            v-if="storeCount.taskDetail.description.length > 0"
          >
            <div class="desc__nav">
              <p class="desc__title">Description</p>
            </div>
            <p class="description">{{ storeCount.taskDetail.description }}</p>
          </div>
          <div
            class="subTaskContainer"
            v-if="storeCount.taskDetail.tempSubTasks.length > 0"
          >
            <p class="subTaskLength">
              Subtasks ({{ storeCount.taskDetail.doneSubtask.length }} of
              {{ storeCount.taskDetail.tempSubTasks.length }})
            </p>
            <div
              class="subTask"
              :class="{ done: item.isTaskChecked }"
              v-for="item in storeCount.taskDetail.tempSubTasks"
              :key="item"
            >
              <input
                type="checkbox"
                class="form-check-input"
                v-model="item.isTaskChecked"
                @click="storeCount.listCheckedTasks"
              />
              <span class="task__desc">{{ item.subTaskValue }}</span>
            </div>
          </div>

          <div class="form__control">
            <label class="form__label">Change Status</label>
            <div class="status__container">
              <select class="form__select" v-model="storeCount.status">
                <option
                  v-for="itemName in storeCount.allData[
                    storeCount.boardInfo.selectedTabIndex
                  ].taskRow"
                  :key="itemName.colName"
                >
                  {{ itemName.colName }}
                </option>
              </select>
              <PrimaryBtn
                buttonWidth="22%"
                background="var(--green)"
                color="var(--white)"
                class="m-0"
                @click="storeCount.changeStatus()"
                ><i class="fa-solid fa-check me-2"></i>Apply</PrimaryBtn
              >
            </div>
            <span
              class="input__info"
              v-if="storeCount.validationField.emptyStatus"
              >Can't be empty</span
            >
            <span
              class="input__info"
              v-if="storeCount.validationField.selectStatus"
              >The same status cannot be selected</span
            >
          </div>
        </div>
        <!--Open Task Info end-->

        <!-- Edit Task Info-->

        <div v-if="storeCount.modal.name == 'edit-task'" class="edit-task">
          <div class="form__control">
            <label class="form__label">Task Name</label>
            <input
              class="form__input"
              type="text"
              placeholder="e.g.Take coffe break"
              v-model="storeCount.taskDetail.taskName"
            />
            <span class="input__info" v-if="storeCount.validationField.taskName"
              >Can't be empty</span
            >
          </div>
          <div class="form__control">
            <label class="form__label">Description</label>
            <textarea
              class="form__textarea"
              type="text"
              placeholder="e.g. It's always good to break. This 15 minute break will recharge the batteries a little"
              v-model="storeCount.taskDetail.description"
            ></textarea>
          </div>
          <div
            class="form__control"
            v-if="storeCount.taskDetail.tempSubTasks.length > 0"
          >
            <label class="form__label">Subtasks</label>
            <div
              class="subtask"
              v-for="(item, index) in storeCount.taskDetail.tempSubTasks"
              :key="index"
            >
              <input
                class="form__input"
                type="text"
                v-model="item.subTaskValue"
              />
              <i
                class="fa-solid fa-xmark"
                @click="storeCount.deleteSubTask(index)"
              ></i>
            </div>
            <span class="input__info" v-if="storeCount.validationField.subTask"
              >Can't be empty</span
            >
          </div>
          <PrimaryBtn
            buttonWidth="100%"
            background="var(--white)"
            color="var(--primary)"
            @click="storeCount.addNewSubTask"
            ><i class="fa-solid fa-plus me-2"></i> Add New Subtask</PrimaryBtn
          >

          <PrimaryBtn
            buttonWidth="100%"
            class="mb-0"
            @click="storeCount.editTask()"
          >
            Save Changes</PrimaryBtn
          >
        </div>

        <!-- Edit Task Info-->

        <!-- Delete Task Info-->
        <div v-if="storeCount.modal.name == 'delete-task'" class="delete-task">
          <p class="deleteTaskInfo">
            Are you sure you want to delete this task and its subtasks? <br />
            <span>This action cannot be reversed.</span>
          </p>
          <div class="btnsGroup">
            <PrimaryBtn
              buttonWidth="100%"
              background="var(--red)"
              color="var(--white)"
              @click="storeCount.deleteTask"
            >
              Delete</PrimaryBtn
            >
            <PrimaryBtn
              buttonWidth="100%"
              background="var(--primary)"
              color="var(--white)"
              @click="storeCount.cancelAction()"
            >
              Cancel</PrimaryBtn
            >
          </div>
        </div>
        <!-- Delete Task Info-->

        <!--Info modal-->
        <div v-if="storeCount.modal.name == 'info'" class="info">
          <h3>Kanban Task Management</h3>
          <p class="info__text">
            Kanban Task Management is a Vue 3 Composition API website that
            allows you to manage your tasks using the Kanban methodology.
          </p>
          <p class="info__text">
            When you first enter the site, you will need to log in or create an
            account. Once you are logged in, you will see a list of your boards.
            You can create a new board by clicking the
            <span class="special__info">"Create New Board"</span> button.
          </p>
          <p class="info__text">
            Each board has three columns by default: Todo, Doing, and Done. You
            can change the names of these columns or add new columns by clicking
            the <span class="special__info">"Edit Board"</span> button.
          </p>
          <p class="info__text">
            To create a new task, click the
            <span class="special__info">"Create New Task"</span> button in the
            upper right corner of the screen. In the new task window, you can
            enter the name of the task, a description, and subtasks. You can
            also choose which column the task should be in.
          </p>
          <p class="info__text">
            To view a task in more detail, click on it. This will open a window
            where you can see the task's description, subtasks, and status. You
            can also complete subtasks and move the task to other columns by
            clicking the corresponding buttons.
          </p>
          <p class="info__text">
            To edit or delete a task, click the corresponding buttons in the
            task's detail window.
          </p>
          <p class="info__text title">Features:</p>
          <ul>
            <li>Login and user management with Firebase</li>
            <li>Create, edit, and delete boards</li>
            <li>Create, edit, and delete tasks</li>
            <li>
              View task details, complete subtasks, and move tasks to other
              columns
            </li>
            <li>Use Vue 3 Composition API, Pinia, and Vite</li>
            <li>Bootstrap and custom SCSS design</li>
          </ul>
          <p class="info__text title">Limitations:</p>
          <ul>
            <li>
              Since the site does not have a backend, all tasks or boards
              created will be lost when the site is renewed.
            </li>
          </ul>
          <p class="info__text title">Benefits:</p>
          <ul>
            <li>
              Kanban Task Management is a simple and easy-to-use way to manage
              your tasks.
            </li>
            <li>
              The Vue 3 Composition API and Pinia make it easy to develop and
              maintain the site.
            </li>
            <li>
              The Bootstrap and custom SCSS design make the site look modern and
              professional.
            </li>
          </ul>
          <p class="info__text title">Who can use Kanban Task Management?</p>
          <p class="info__text">
            Kanban Task Management can be used by anyone who needs to manage
            their tasks, such as individuals, teams, and businesses. It is
            especially well-suited for projects that have multiple stages, such
            as software development, product development, and marketing
            campaigns.
          </p>
          <p class="info__text title">
            How to get started with Kanban Task Management:
          </p>
          <ol>
            <li>Create an account or log in to the site.</li>
            <li>Create a new board for your project.</li>
            <li>Create new tasks and add them to the board.</li>
            <li>
              View task details, complete subtasks, and move tasks to other
              columns as needed.
            </li>
          </ol>
          <h5>Created by Murad Muradov</h5>
        </div>
        <!--Info modal end-->
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
import { ref } from "vue";
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
  transition: 0.7s ease;
  main {
    display: flex;
    position: relative;
    .content {
      width: 100%;
      overflow-y: auto;
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
    .input__info {
      color: var(--red);
      font-size: 14px;
      padding: 10px;
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
      // .errorBorder{
      //   border: 1px solid var(--red) !important;
      // }
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
    margin-bottom: 50px;
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
    .col__list {
      display: flex;
      align-items: center;
      i {
        margin-left: 20px;
        color: var(--white);
        font-size: 20px;
        cursor: pointer;
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
    .deleteItem {
      color: var(--red);
    }
  }
  .btnsGroup {
    display: flex;
    gap: 70px;
  }
}

.open-task {
  .description__container {
    margin-bottom: 30px;
    .desc__nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;

      i {
        color: var(--white);
        cursor: pointer;
      }
      .desc__title {
        color: var(--grey);
        font-weight: 500;
        margin-bottom: 0px;
      }
    }
    .description {
      color: var(--white);
      font-size: 14px;
    }
  }
  .subTaskContainer {
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .subTaskLength {
      color: var(--grey);
      font-weight: 500;
      margin-bottom: 10px;
    }
    .subTask {
      display: flex;
      align-items: center;
      background: var(--bg);
      padding: 10px 20px;
      border-radius: 8px;
      input {
        margin: 0;
      }
      .task__desc {
        margin-left: 15px;
        color: var(--white);
        font-weight: 700;
        font-size: 16px;
      }
      .form-check-input {
        border-radius: 0;
        box-shadow: none;
        &:checked {
          background-color: var(--primary);
          border-color: var(--primary);
        }
      }
    }
    .done {
      .task__desc {
        color: var(--grey);
        position: relative;
        &::before {
          content: "";
          width: 100%;
          height: 1.5px;
          background: var(--grey);
          position: absolute;
          top: 60%;
          left: 0;
          transform: translate(-0%, -50%);
        }
      }
    }
  }
  .form__control {
    margin-bottom: 10px;
    .form__label {
      color: var(--white);
      font-weight: 700;
      font-size: 14px;
      margin-bottom: 10px;
    }
    .status__container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 50px;
      .form__select {
        width: 80%;
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
    }
    .input__info {
      color: var(--red);
      font-size: 14px;
      padding: 10px;
    }
  }
}

.edit-task {
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
    .input__info {
      color: var(--red);
      font-size: 14px;
      padding: 10px;
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
      // .errorBorder{
      //   border: 1px solid var(--red) !important;
      // }
    }
  }
}

.delete-task {
  .deleteTaskInfo {
    color: var(--grey);
    span {
      color: var(--red);
    }
  }
  .btnsGroup {
    display: flex;
    gap: 70px;
  }
}

.info {
  h3 {
    color: var(--primary);
    margin-bottom: 20px;
  }
  h5 {
    color: var(--primary);
  }
  .info__text {
    color: var(--grey);
    .special__info {
      color: var(--primary);
    }
  }
  .title {
    color: var(--green);
  }
  ul,
  ol {
    margin-bottom: 20px;
    li {
      color: var(--grey);
    }
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
  .open-task {
    .status__container {
      .form__select {
        width: 60%;
      }
      button {
        width: 30% !important;
      }
    }
  }
}
</style>
