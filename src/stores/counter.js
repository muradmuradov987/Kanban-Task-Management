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
    hideSidebar() {
      this.showAside = false;
    },
    openSidebar() {
      this.showAside = true;
    },
    editBtn() {
      console.log("edit");
    },
    // Method to add a new tab
    addTab(tabName) {
      if (this.tabInfo.tabName == "") {
        return;
      } else {
        this.allData.push({
          tabName:tabName,
          todo:[],
          doing:[],
          done:[]
        })
        this.tabInfo.tabName = "";
      }




    },
    //Select tab
    selectTab(index) {
      this.tabInfo.selectedTabIndex = index;
    },
  },
});
