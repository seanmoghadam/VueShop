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

            <error-renderer :errors="errors"></error-renderer>

            <div class="flex flex-col items-center justify-content-center ">
                <span>oder</span>
                <router-link :to="'register'" class="text-lightBlue-600"
                    >Registrieren</router-link
                >
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import Loading from "../components/Loading.vue";
import { errorFormatter } from "../helpers";
import ErrorRenderer from "../components/ErrorRenderer.vue";

export default {
    components: { Loading, ErrorRenderer },
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
                    this.errors = errorFormatter(e);
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
