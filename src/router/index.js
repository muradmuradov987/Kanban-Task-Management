import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Auth/Login.vue"),
    },
    {
      path: "/signUp",
      name: "signUp",
      component: () => import("../views/Auth/SignUp.vue"),
    },
    {
      path: "/forgot-password",
      name: "forgotPassword",
      component: () => import("../views/Auth/ForgotPassword.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Auth/Register.vue"),
    },

    {
      path: "/home",
      name: "home",
      component: () => import("../views/Home.vue"),
      meta: { requiresAuth: true },
    },
  ],
});


const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});



export default router;
