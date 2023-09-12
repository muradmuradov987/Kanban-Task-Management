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
    },
    sameColname: false,
    boardInfo: {
      boardName: "",
      selectedTabIndex: 0,
    },
  }),
  getters: {},
  actions: {
    openModal(title, name) {
      this.modal.show = true;
      this.modal.title = title;
      this.modal.name = name;
      // this.modal.editBtn = edit;
    },
    closeModal() {
      this.modal.show = false;
      this.modal.title = "";
      this.modal.name = "";
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
    },

    addBoard(boardName) {
      if (this.boardInfo.boardName === "") {
        this.validationField.boardField = true;
      } else {
        this.allData.push({
          boardName: boardName,
          editBoardName: boardName,
          taskRow: {
            Todo: [],
            Doing: [],
            Done: [],
          },
        });
        this.resetData();
        this.closeModal();
      }
      console.log(Object.keys(this.allData[this.boardInfo.selectedTabIndex].taskRow));
    },

    saveEditBoard() {
      if (this.allData[this.boardInfo.selectedTabIndex].editBoardName === "") {
        this.validationField.editBoardField = true;
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

    //Add new column
    addColumn() {
      let taskRow = this.allData[this.boardInfo.selectedTabIndex].taskRow;
      var calNames = [];
      for (let i in taskRow) {
        calNames.push(i);
      }
      if (this.colName === "") {
        this.validationField.columnField = true;
        this.sameColname = false;
      } else if (calNames.includes(this.colName)) {
        this.validationField.columnField = false;
        this.sameColname = true;
      } else {
        this.allData[this.boardInfo.selectedTabIndex].taskRow[this.colName] =
          [];
        this.closeModal();
      }
    },

    //Select tab
    selectTab(index) {
      this.boardInfo.selectedTabIndex = index;
    },
  },
});
