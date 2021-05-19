<template>
    <div id="BookListingPage">
        <h1>Bücher Liste</h1>
        <span
            v-if="loading"
            class="h-screen w-screen absolute left-0 top-0 flex justify-center items-center"
            >Loading...</span
        >
        <ul>
            <li v-for="book in books" :key="book">
                {{ book.title }}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from "axios";

export default {
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
        getBooks: function(e) {
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

            e.preventDefault();
        },
    },
};
</script>
