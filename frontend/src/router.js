import Login from "./components/Login";
import App from "./App";
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
        component: App,
        beforeEnter: authGuard
    },
    {
        path: '/',
        component: Login,
        name: "Login",
    },
    // {
    //     path: '*',
    //     redirect: '/login',
    // }
]

const router = new VueRouter({
    mode: 'history',
    routes
})


export default router;
