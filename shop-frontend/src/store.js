import Vue from "vue";
import Vuex from "vuex";
import { addBookToCart, removeBookFromCart } from "./helpers";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cart: []
    },
    mutations: {
        addBookToCart,
        removeBookFromCart,
    }
})