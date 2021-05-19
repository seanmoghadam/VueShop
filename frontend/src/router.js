import Login from "./components/Login";
import Error from "./components/Error";
import Register from "./components/Register";
import BookListing from "./components/BookListing";
import VueRouter from "vue-router";

const authGuard = (_to, _from, next) => {
    let isAuthenticated = false;
    if (localStorage.getItem('authorization-token')) {
        isAuthenticated = true;
    }
    
    if (isAuthenticated) {
        // allow to enter route
        next();
    } else {
        // go to '/login';
        next('/login');
    }
}

const routes = [
    {
        path: '/book-listing',
        component: BookListing,
        beforeEnter: authGuard
    },
    {
        path: '/register',
        component: Register,
        name: "Register",
    },
    {
        path: '/',
        component: Login,
        name: "Login",
    },
    
    {
        path: '*',
        component: Error,
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})


export default router;
