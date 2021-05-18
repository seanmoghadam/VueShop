<template>
    <div id="LoginPage">
        <form action="post" @submit="submitLogin">
            <fieldset>
                <label for="email">E-Mail</label>
                <input type="email" name="email" id="email" v-model="email" placeholder="Ihre E-Mail"/>
            </fieldset>
            <fieldset>
                <label for="password">Password</label>
                <input type="password" name="password" id="password" v-model="password" placeholder="Ihr Passwort"/>
            </fieldset>

            <span v-if="loading">Loading...</span>

            <input type="submit" value="Submit" />
            <ul id="errors">
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
                    this.errors = e.response.data.errors;
                })
                .then((resp) => {
                  window.localStorage.setItem("authorization-token", resp.data.token);
                  this.$router.push('/book-listing');
                })
                .finally(() => {
                    this.loading = false;
                });

            e.preventDefault();
        },
    },
};
</script>

<style>
input {
    padding: 10px;
    border: 1px inset lightblue;
    border-radius: 3px;
}
.message {
    font-size: 18px;
    font-family: "Roboto", sans-serif;
    color: blue;
}
fieldset {
    border: none;
    display: flex;
    flex-flow: column wrap;
}
#LoginPage {
    max-width: 500px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-flow: column wrap;
    height: 100vh;
}
</style>
