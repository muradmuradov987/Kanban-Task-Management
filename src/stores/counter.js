import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    modal: {
      showModal: false,
      name: "",
      title: "sssss",
    },
    isLoggedIn: false,
  }),
});
