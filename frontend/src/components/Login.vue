<template>
    <div id="LoginPage">
        <form
            action="post"
            @submit="submitLogin"
            class="flex flex-col w-75 justify-center items-center w-40 mx-auto mt-20 border-1 border-gray-400	-"
        >
            <fieldset class="block">
                <label class="text-sm" for="email">E-Mail</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    v-model="email"
                    placeholder="Ihre E-Mail"
                />
            </fieldset>
            <fieldset class="block">
                <label class="text-sm" for="password">Passwort</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    v-model="password"
                    placeholder="Ihr Passwort"
                />
            </fieldset>

            <span
                v-if="loading"
                class="h-screen w-screen absolute left-0 top-0 flex justify-center items-center"
                >Loading...</span
            >


            <input type="submit" value="Einloggen" class="px-5 mt-3 cursor-pointer" />
            <ul id="errors" class="text-xs mt-5" style="color: red">
                <li v-for="error in errors" :key="error">
                    {{ error }}
                </li>
            </ul>
            <span>oder</span>
            <router-link :to="'register'">Registrieren</router-link>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data: () => ({
        errors: [],
        email: null,
        password: null,
        loading: false,
    }),
    methods: {
        submitLogin: function(e) {
            this.loading = true;
            this.errors = [];
            axios
                .post("http://localhost/api/login", {
                    email: this.email,
                    password: this.password,
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
                    if (resp?.data?.token) {
                        window.localStorage.setItem(
                            "authorization-token",
                            resp.data.token
                        );
                        this.$router.push("/book-listing");
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
