<template>
  <div id="LoginPage">
    <form
      method="get"
      v-on:submit.prevent="submitLogin"
      class="flex flex-col max-w-sm p-10 mx-auto mt-20 overflow-hidden rounded shadow-lg w-75"
    >
      <h1 class="text-xl">Log-In</h1>

      <fieldset class="block mt-5">
        <label class="inline-block w-24 text-sm" for="email">E-Mail</label>
        <input
          type="email"
          autocomplete="off"
          name="email"
          id="email"
          v-model="email"
          placeholder="Your e-mail"
        />
      </fieldset>
      <fieldset class="block">
        <label class="inline-block w-24 text-sm" for="password">Password</label>
        <input
          type="password"
          autocomplete="off"
          name="password"
          id="password"
          v-model="password"
          placeholder="Your password"
        />
      </fieldset>

      <loading></loading>

      <input type="submit" value="Log-In" class="px-5 mt-3 cursor-pointer" />

      <error-renderer :errors="errors"></error-renderer>

      <div class="flex flex-col items-center justify-content-center">
        <span>or</span>
        <router-link :to="'register'" class="text-lightBlue-600"
          >Register</router-link
        >
      </div>
    </form>
  </div>
</template>

<script>
import Loading from "../components/Loading.vue";
import { errorFormatter } from "../helpers";
import ErrorRenderer from "../components/ErrorRenderer.vue";
import AuthService from "../services/AuthService";

export default {
  components: { Loading, ErrorRenderer },
  data: () => ({
    errors: [],
    email: "sean@du.digital",
    password: "111111",
    loading: false,
  }),
  methods: {
    submitLogin: async function () {
      this.loading = true;
      this.errors = [];
      try {
        const token = await AuthService.login({
          email: this.email,
          password: this.password,
        });
        AuthService.setToken(token);
        this.$router.push("/");
      } catch (e) {
        this.errors = errorFormatter(e);
      }
    },
  },
};
</script>
