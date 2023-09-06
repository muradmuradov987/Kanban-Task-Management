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
    colName: '',
    tabInfo: {
      tabName: "",
      selectedTabIndex: 0,
    },
  }),
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
      this.resetData()
    },

    hideSidebar() {
      this.showAside = false;
    },
    openSidebar() {
      this.showAside = true;
    },
    resetData() {
     this.colName = ''
     this.tabInfo.tabName = ''
    },
    // Method to add a new tab
    addTab(tabName) {
      if (this.tabInfo.tabName == "") {
        return;
      } else {
        this.allData.push({
          tabName: tabName,
          taskRow: {
            Todo: [],
            Doing: [],
            Done: [],
          },
        });
        this.tabInfo.tabName = "";
      }
      this.closeModal();
    },

    //Add new column
    addColumn(){
     
      // this.allData[this.tabInfo.selectedTabIndex].taskRow.assign(
      //   this.colName : []
      // )
    },
    //Select tab
    selectTab(index) {
      this.tabInfo.selectedTabIndex = index;
    },
  },
});
