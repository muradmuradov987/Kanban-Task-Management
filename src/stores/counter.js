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
  }),
  actions: {
    openModal(title, name ) {
      this.modal.show = true;
      this.modal.title = title;
      this.modal.name = name;
      // this.modal.editBtn = edit;
    },
    editBtn() {
      console.log("sdghadsbhsdgb");
    },
  },
});
