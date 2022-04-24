import { createStore } from "vuex";
import BookService from "../services/BookService.js";
import { errorFormatter } from "../helpers.js";

const defaultState = {
  books: [],
  cart: [],

  loading: false,
  errors: [],

  searchTerm: "",
};

export default createStore({
  state: defaultState,
  mutations: {
    addBookToCart: BookService.addBookToCart,
    removeBookFromCart: BookService.removeBookFromCart,
  },
  actions: {
    async getBooks({ commit }, { apiUrl }) {
      commit("setLoading", true);
      commit("setErrors", []);
      try {
        const allBooks = await BookService.getBooks(apiUrl);
        commit("addBooksToStore", allBooks);
      } catch (e) {
        commit("setErrors", errorFormatter(e));
      }
      commit("setLoading", false);
    },
    async addBookToCart({ commit }, book) {
      console.log(book);
      commit("addBookToCart", book);
    },
    async removeBookFromCart({ commit }, index) {
      commit("removeBookFromCart", index);
    },
  },
  modules: {},
});
