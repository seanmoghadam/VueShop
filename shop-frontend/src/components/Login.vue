<template>
    <div id="LoginPage">
        <form
            action="post"
            @submit="submitLogin"
            class="flex flex-col w-75 mx-auto mt-20 max-w-sm rounded overflow-hidden shadow-lg p-10"
        >
            <h1 class="text-xl">Einloggen</h1>

            <fieldset class="block mt-5">
                <label class="text-sm inline-block w-24" for="email"
                    >E-Mail</label
                >
                <input
                    type="email"
                    name="email"
                    id="email"
                    v-model="email"
                    placeholder="Ihre E-Mail"
                />
            </fieldset>
            <fieldset class="block">
                <label class="text-sm inline-block w-24" for="password"
                    >Passwort</label
                >
                <input
                    type="password"
                    name="password"
                    id="password"
                    v-model="password"
                    placeholder="Ihr Passwort"
                />
            </fieldset>

            <loading></loading>

            <input
                type="submit"
                value="Einloggen"
                class="px-5 mt-3 cursor-pointer"
            />
            <ul id="errors" class="text-xs mt-5" style="color: red">
                <li v-for="error in errors" :key="error">
                    {{ error }}
                </li>
            </ul>
            <div class="flex flex-col items-center justify-content-center">
                <span>oder</span>
                <router-link :to="'register'">Registrieren</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import Loading from './Loading.vue';

export default {
  components: { Loading },
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
                        this.$router.push("/");
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
