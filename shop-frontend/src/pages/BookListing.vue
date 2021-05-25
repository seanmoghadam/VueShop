<template>
    <div id="BookListingPage" class="max-w-xl m-auto">
        <h1 class="text-xl">Bücher Liste</h1>
        <loading></loading>
        <ul class="flex flex-row flex-wrap">
            <li
                v-for="book in books"
                :key="book.id"
                class="flex flex-col rounded overflow-hidden shadow-lg p-2 w-full md:w-1/3 lg:w-1/4"
            >
                <h2 class=" truncate">{{ book.title }}</h2>
                <div class="flex justify-between">
                    <div class="relative">
                        <img
                            :src="book.image"
                            :alt="book.title"
                            class="h-20 rounded-sm block"
                        />
                        <button
                            @click="addBookToCart(book)"
                            class="bg-green-500 hover:red-700 text-white font-bold py-1 px-4 rounded  mt-1 absolute right-1 bottom-1"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </li>
        </ul>
        <error-renderer :errors="errors"></error-renderer>
    </div>
</template>

<script>
import axios from "axios";
import Loading from "../components/Loading.vue";
import store from "../store";
import { errorFormatter } from "../helpers";
import ErrorRenderer from "../components/ErrorRenderer.vue";

export default {
    components: { Loading, ErrorRenderer },
    data: () => ({
        // app specific state
        errors: [],
        loading: false,

        // content specific state
        books: [],
    }),
    // on mount -> fetch books
    beforeMount() {
        this.getBooks();
    },
    methods: {
        // method fetch books
        getBooks: function() {
            this.loading = true;
            this.errors = [];
            const token = window.localStorage.getItem("authorization-token");
            axios
                .get("http://localhost/api/books", {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .catch((e) => {
                    this.errors = errorFormatter(e);
                })
                .then((resp) => {
                    if (resp?.data) {
                        this.books = resp.data;
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        addBookToCart: (book) => {
            store.commit("addBookToCart", book);
        },
    },
};
</script>
