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
      console.log("sdghadsbhsdgb");
    },
  },
});
