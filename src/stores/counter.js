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

    allData: [],
    colName: "",
    emptyField: false,
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
    resetData() {
      this.colName = "";
      this.boardInfo.boardName = "";
      this.emptyField = false;
      this.sameColname = false;
    },

    addBoard(boardName) {
      if (this.boardInfo.boardName == "") {
        return;
      } else {
        this.allData.push({
          boardName: boardName,
          taskRow: {
            Todo: [],
            Doing: [],
            Done: [],
          },
        });
        this.boardInfo.boardName = "";
      }
      this.closeModal();
    },

    deleteBoard() {
      this.allData.splice(this.boardInfo.selectedTabIndex, 1);

      this.closeModal();
      if ((this.boardInfo.selectedTabIndex = 0)) {
        this.boardInfo.selectedTabIndex = 0;
      } else {
        this.boardInfo.selectedTabIndex - 1;
      }
    },

    //Add new column
    addColumn() {
      let taskRow = this.allData[this.boardInfo.selectedTabIndex].taskRow;

      var calNames = [];
      for (let i in taskRow) {
        calNames.push(i);
      }
      if (this.colName === "") {
        this.emptyField = true;
        this.sameColname = false;
      } else if (calNames.includes(this.colName)) {
        this.emptyField = false;
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
