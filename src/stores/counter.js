import { defineStore } from "pinia";

export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    isThemeChecked: true,
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
      taskName: false,
      addStatus: false,
      subTask: false,
      emptyStatus: false,
      selectStatus: false,
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
    tempSubTasksLength: 0,

    taskDetail: null,

    status: "",
    tasksColName: "",

    tempSubTasks: [
      { isTaskChecked: false, subTaskValue: "" },
      { isTaskChecked: false, subTaskValue: "" },
    ],
  }),
  getters: {
    // countTrueValues() {
    //  this.tempSubTasksLength =  this.taskDetail.tempSubTasks.filter((task) => task.isTaskChecked).length;
    // },
  },
  actions: {
    openModal(title, name, taskCard, tasksColName) {
      this.modal.show = true;
      this.modal.title = title;
      this.modal.name = name;
      this.taskDetail = taskCard;
      this.tasksColName = tasksColName;
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
      this.validationField.taskName = false;
      this.validationField.addStatus = false;
      this.validationField.subTask = false;
      (this.validationField.emptyStatus = false),
        (this.validationField.selectStatus = false),
        (this.newTaskInfo.taskName = "");
      this.newTaskInfo.desc = "";
      this.status = "";
      this.tasksColName = "";
      this.taskDetail = null;
      this.tempSubTasks = [];
      this.tempSubTasks.push(
        { isTaskChecked: false, subTaskValue: "" },
        { isTaskChecked: false, subTaskValue: "" }
      );
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
      let checkSubTaskValue = this.tempSubTasks.some(
        (item) => item.subTaskValue === ""
      );

      if (this.newTaskInfo.taskName === "") {
        this.validationField.taskName = true;
        return;
      }

      if (checkSubTaskValue) {
        this.validationField.subTask = true;
        return;
      }

      if (this.status === "") {
        this.validationField.addStatus = true;
        return;
      }

      let selectedStatus = this.allData[
        this.boardInfo.selectedTabIndex
      ].taskRow.filter((item) => item.colName === this.status);
      selectedStatus[0].allTaskData.push({
        id: Date.now() + Math.random(),
        taskName: this.newTaskInfo.taskName,
        description: this.newTaskInfo.desc,
        tempSubTasks: this.tempSubTasks,
        doneSubtask: [],
      });

      this.tempSubTasks = [];
      this.tempSubTasks.push(
        { isTaskChecked: false, subTaskValue: "" },
        { isTaskChecked: false, subTaskValue: "" }
      );
      this.status = "";
      this.closeModal();
    },

    addNewSubTask() {
      this.tempSubTasks.push({
        isTaskChecked: false,
        subTaskValue: "",
      });
    },

    async listCheckedTasks() {
      let selectedStatus = this.allData[
        this.boardInfo.selectedTabIndex
      ].taskRow.filter((item) => item.colName === this.tasksColName);

      let selectedTaskDetail = selectedStatus[0].allTaskData.filter(
        (item) => item.id === this.taskDetail.id
      );

      setTimeout(() => {
        let doneSubtask = selectedTaskDetail[0].tempSubTasks.filter(
          (item) => item.isTaskChecked === true
        );
        selectedTaskDetail[0].doneSubtask = [];
        selectedTaskDetail[0].doneSubtask = [...doneSubtask];
      }, 300);
    },

    deleteSubTask(index) {
      this.tempSubTasks.splice(index, 1);
    },
    //Select tab
    selectTab(index) {
      this.boardInfo.selectedTabIndex = index;
    },

    changeStatus() {
      if (this.status === "") {
        this.validationField.selectStatus = false;
        this.validationField.emptyStatus = true;
      } else if (this.status === this.tasksColName) {
        this.validationField.selectStatus = true;
        this.validationField.emptyStatus = false;
        return;
      } else {
        //Delete task from where it is
        this.allData[this.boardInfo.selectedTabIndex].taskRow.forEach(
          (item) => {
            if (item.colName === this.tasksColName) {
              item.allTaskData = item.allTaskData.filter(
                (a) => a.id !== this.taskDetail.id
              );
            }
          }
        );
        // Choose the place to be transferred
        this.allData[this.boardInfo.selectedTabIndex].taskRow.filter((item) => {
          if (item.colName === this.status) {
            item.allTaskData.push(this.taskDetail);
          }
        });
        this.closeModal();
      }
    },
  },
});
