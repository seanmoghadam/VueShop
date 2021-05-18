<template>
    <div id="RegisterPage">
        <form
            action="post"
            @submit="submitRegister"
            class="flex flex-col w-75 justify-center items-center w-40 mx-auto mt-20 border-1 border-gray-400	-"
        >
            <fieldset class="block">
                <label for="firstname">Vorname</label>
                <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    v-model="firstname"
                    placeholder="Ihr Vorname"
                />
            </fieldset>
            <fieldset class="block">
                <label for="lastname">Nachname</label>
                <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    v-model="lastname"
                    placeholder="Ihr Nachname"
                />
            </fieldset>
            <fieldset class="block">
                <label for="email">E-Mail</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    v-model="email"
                    placeholder="Ihre E-Mail"
                />
            </fieldset>
            <fieldset class="block">
                <label for="password">Passwort</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    v-model="password"
                    placeholder="Ihr Passwort"
                />
            </fieldset>
            <fieldset class="block">
                <label for="password_confirmation">Passwort Wiederholung</label>
                <input
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    v-model="password_confirmation"
                    placeholder="Ihr Passwort"
                />
            </fieldset>

            <span
                v-if="loading"
                class="h-screen w-screen absolute left-0 top-0 flex justify-center items-center"
                >Loading...</span
            >

            <input type="submit" value="Registrieren" class="px-5 mt-3" />
            <ul id="errors" class="text-xs mt-5" style="color: red">
                <li v-for="error in errors" :key="error">
                    {{ error }}
                </li>
            </ul>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data: () => ({
        // state
        errors: [],
        loading: false,

        // form state
        password: null,
        firstname: null,
        lastname: null,
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
