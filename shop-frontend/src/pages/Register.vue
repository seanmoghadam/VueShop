<template>
    <div id="RegisterPage">
        <form
            action="post"
            @submit="submitRegister"
            class="flex flex-col w-75 mx-auto mt-20 max-w-sm rounded overflow-hidden shadow-lg p-10"
        >
            <h1 class="text-xl">Registrierung</h1>
            <fieldset class="block mt-5">
                <label class="text-sm inline-block w-24" for="name">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    v-model="name"
                    placeholder="Ihr Name"
                />
            </fieldset>
            <fieldset class="block">
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
            <fieldset class="block">
                <label
                    class="text-sm inline-block w-24"
                    for="password_confirmation"
                    >Passwort Wiederholung</label
                >
                <input
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    v-model="password_confirmation"
                    placeholder="Ihr Passwort"
                />
            </fieldset>

            <loading></loading>

            <input
                type="submit"
                value="Registrieren"
                class="px-5 mt-8 cursor-pointer"
            />

            <error-renderer :errors="errors"></error-renderer>

            <div class="flex flex-col items-center justify-content-center ">
                <span>oder</span>
                <router-link :to="'login'" class="text-lightBlue-600"
                    >Einloggen</router-link
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
        // state
        errors: [],
        loading: false,

        // form state
        password: null,
        name: null,
        password_confirmation: null,
        email: null,
    }),
    methods: {
        submitRegister: function(e) {
            this.loading = true;
            this.errors = [];
            axios
                .post("http://localhost/api/register", {
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                    name: this.name,
                })
                .catch((e) => {
                    this.errors = errorFormatter(e);
                })
                .then((resp) => {
                    if (resp?.data?.token) {
                        this.$router.push("/login");
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
