import Login from "./pages/Login";
import Error404 from "./pages/Error404";
import Register from "./pages/Register";
import BookListing from "./pages/BookListing";
import VueRouter from "vue-router";
import { isLoggedIn } from "./helpers";

const userGuard = (_to, _from, next) => {
    let isAuthenticated = isLoggedIn()
    
    if (isAuthenticated) {
        // allow to enter route
        next();
    } else {
        // go to '/login';
        next('/login');
    }
}

const redirectGuard = (_to, _from, next) => {
    let isAuthenticated = isLoggedIn()
    
    if (isAuthenticated) {
        // allow to enter route
        next("/");
    } else {
        // go to '/login';
        next();
    }
}

const routes = [
    {
        path: '/',
        component: BookListing,
        beforeEnter: userGuard
    },
    {
        path: '/register',
        component: Register,
        name: "Register",
        beforeEnter: redirectGuard
    },
    {
        path: '/login',
        component: Login,
        name: "Login",
        beforeEnter: redirectGuard
    },
    {
        path: '*',
        component: Error404,
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})


export default router;
