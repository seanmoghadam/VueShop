<template>
    <div id="BookListingPage" class="max-w-xl m-auto">
        <h1 class="my-3">Bücher Liste</h1>
        <loading></loading>
        <ul class="flex flex-row flex-wrap">
            <li
                v-for="(book, index) in books"
                :key="book.isbn + index"
                class="flex flex-col rounded overflow-hidden shadow-lg p-2 w-full md:w-1/3 lg:w-1/4"
            >
                <h2 class="text-xs truncate">{{ book.title }}</h2>
                <div class="flex justify-between">
                    <div class="relative">
                        <img
                            :src="book.image"
                            :alt="book.title"
                            class="h-20 rounded-sm block"
                        />
                        <button
                            @click="addBookToCart(book)"
                            class="bg-green-500 hover:red-700 text-white font-bold py-1 px-4 rounded text-xs mt-1 absolute right-1 bottom-1"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from "axios";
import Loading from "./Loading.vue";
import store from "./../store";

export default {
    components: { Loading },
    data: () => ({
        // app specific state
        errors: [],
        loading: false,

        // content specific state
        books: [],
    }),
    beforeMount() {
        this.getBooks();
    },
    methods: {
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
                    console.error("Error", e.response);
                    if (Array.isArray(e?.response?.data?.errors)) {
                        this.errors = e.response.data.errors;
                    } else if (e?.response?.data?.message) {
                        this.errors = [e?.response?.data?.message];
                    } else {
                        this.errors = [
                            "Es ist ein unbekannter Fehler aufgetreten",
                        ];
                    }
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
