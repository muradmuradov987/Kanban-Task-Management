import "./assets/css/main.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBoSx4PFsgNPwUxnG2zwkLPTobzU56cf7I",
  authDomain: "kanban-task-3c54c.firebaseapp.com",
  projectId: "kanban-task-3c54c",
  storageBucket: "kanban-task-3c54c.appspot.com",
  messagingSenderId: "50237899116",
  appId: "1:50237899116:web:6ecbd49609269db9017349",
};

initializeApp(firebaseConfig);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
