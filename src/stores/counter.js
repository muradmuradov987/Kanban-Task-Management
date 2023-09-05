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
    // boardLink: [{ boardName: "test" }, { boardName: "test2" }],
    boardLink: [],
    linkName: "",
    isLoggedIn: false,
    showAside: true,
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
    addTab(title) {
      this.boardLink.push({ title });
    },
  },
});
