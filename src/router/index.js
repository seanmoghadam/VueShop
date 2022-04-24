import Login from "../views/login";
import Error404 from "../views/not-found";
import Register from "../views/register";
import BookListing from "../views/index";
import { createRouter, createWebHashHistory } from "vue-router";
import AuthService from "../services/AuthService";

const userGuard = (_to, _from, next) => {
  let isAuthenticated = AuthService.isLoggedIn();

  if (isAuthenticated) {
    // allow to enter route
    next();
  } else {
    // go to '/login';
    next("/login");
  }
};

const redirectGuard = (_to, _from, next) => {
  let isAuthenticated = AuthService.isLoggedIn();

  if (isAuthenticated) {
    // allow to enter route
    next("/");
  } else {
    // go to '/login';
    next();
  }
};

const routes = [
  {
    path: "/",
    component: BookListing,
    beforeEnter: userGuard,
  },
  {
    path: "/register",
    component: Register,
    name: "Register",
    beforeEnter: redirectGuard,
  },
  {
    path: "/login",
    component: Login,
    name: "Login",
    beforeEnter: redirectGuard,
  },
  {
    path: "/:catchAll(.*)",
    component: Error404,
  },
];

const router = createRouter({
  mode: "history",
  history: createWebHashHistory(),
  routes,
});

export default router;
