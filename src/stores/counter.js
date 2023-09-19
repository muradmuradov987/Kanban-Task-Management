import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    modal: {
      show: false,
      title: "",
      editBtn: false,
      name: "",
    },
    isLoggedIn: false,
    showAside: true,
    showProfileMenu: false,
    showEditMenu: false,

    allData: [],
    colName: "",
    validationField: {
      boardField: false,
      editBoardField: false,
      columnField: false,
      editColumnField: false,
    },
    sameColname: false,
    boardInfo: {
      boardName: "",
      selectedTabIndex: 0,
    },
    newTaskInfo: {
      taskName: "",
      desc: "",
    },

    taskDetail: null,

    status: "",
  }),
  getters: {},
  actions: {
    openModal(title, name, taskCard, index) {
      this.modal.show = true;
      this.modal.title = title;
      this.modal.name = name;
      this.taskDetail = taskCard;
    },
    closeModal() {
      this.modal.show = false;
      this.modal.title = "";
      this.modal.name = "";
      this.taskDescription = "";
      this.resetData();
    },

    hideSidebar() {
      this.showAside = false;
    },
    openSidebar() {
      this.showAside = true;
    },

    toggleProfile() {
      this.showEditMenu = false;
      this.showProfileMenu = !this.showProfileMenu;
    },
    toggleEditMenu() {
      this.showProfileMenu = false;
      this.showEditMenu = !this.showEditMenu;
    },

    resetData() {
      this.colName = "";
      this.boardInfo.boardName = "";
      this.sameColname = false;
      this.validationField.boardField = false;
      this.validationField.editBoardField = false;
      this.validationField.columnField = false;
      this.validationField.editColumnField = false;
      this.newTaskInfo.taskName = "";
      this.newTaskInfo.desc = "";
      this.status = "";
      this.taskDetail = null;
    },

    addBoard(boardName) {
      if (this.boardInfo.boardName === "") {
        this.validationField.boardField = true;
      } else {
        this.allData.push({
          boardName: boardName,
          editBoardName: boardName,
          taskRow: [
            { colName: "Todo", allTaskData: [] },
            { colName: "Doing", allTaskData: [] },
            { colName: "Done", allTaskData: [] },
          ],
        });
        this.resetData();
        this.closeModal();
      }
    },

    saveEditBoard() {
      const isEmptyBoardField =
        this.allData[this.boardInfo.selectedTabIndex].editBoardName === "";
      const isEmptyColumnField = this.allData[
        this.boardInfo.selectedTabIndex
      ].taskRow.some((item) => item.colName === "");

      if (isEmptyBoardField) {
        this.validationField.editBoardField = true;
      } else if (isEmptyColumnField) {
        this.validationField.editColumnField = true;
      } else {
        this.allData[this.boardInfo.selectedTabIndex].boardName =
          this.allData[this.boardInfo.selectedTabIndex].editBoardName;
        this.closeModal();
      }
    },

    deleteBoard() {
      let arrLength = this.allData.length - 1;
      if (arrLength === this.boardInfo.selectedTabIndex) {
        this.allData.splice(this.boardInfo.selectedTabIndex, 1);
        this.boardInfo.selectedTabIndex = this.boardInfo.selectedTabIndex - 1;
      } else {
        this.allData.splice(this.boardInfo.selectedTabIndex, 1);
      }
      if (this.boardInfo.selectedTabIndex === -1) {
        this.boardInfo.selectedTabIndex = 0;
      }
      this.closeModal();
    },

    deleteColumn(index) {
      this.allData[this.boardInfo.selectedTabIndex].taskRow.splice(index, 1);
    },

    //Add new column
    addNewColumn() {
      let colNames = this.allData[this.boardInfo.selectedTabIndex].taskRow;

      var arrCalNames = [];
      colNames.forEach((item) => {
        arrCalNames.push(item.colName);
      });

      if (this.colName === "") {
        this.validationField.columnField = true;
        this.sameColname = false;
      } else if (arrCalNames.includes(this.colName)) {
        this.validationField.columnField = false;
        this.sameColname = true;
      } else {
        this.allData[this.boardInfo.selectedTabIndex].taskRow.push({
          colName: this.colName,
          allTaskData: [],
        });
        this.closeModal();
      }
    },

    addNewTask() {
      let selectedStatus = this.allData[
        this.boardInfo.selectedTabIndex
      ].taskRow.filter((item) => item.colName === this.status);
      selectedStatus[0].allTaskData.push({
        id: Date.now() + Math.random(),
        taskName: this.newTaskInfo.taskName,
        description: this.newTaskInfo.desc,
      });
      this.status = "";
      this.closeModal();
    },

    //Select tab
    selectTab(index) {
      this.boardInfo.selectedTabIndex = index;
    },
    changeStatus() {
      let changeStatus = this.allData[
        this.boardInfo.selectedTabIndex
      ].taskRow.filter((item) => item.colName === this.status);

      changeStatus[0].allTaskData.push(this.taskDetail);

      let oldStatus = this.allData[this.boardInfo.selectedTabIndex].taskRow;


      // this.closeModal()
    },
  },
});
