<template>
  <div id="RegisterPage">
    <form
      action="post"
      v-on:submit.prevent="submitRegister"
      class="flex flex-col max-w-sm p-10 mx-auto mt-20 overflow-hidden rounded shadow-lg w-75"
    >
      <h1 class="text-xl">Registrierung</h1>
      <fieldset class="block mt-5">
        <label class="inline-block w-24 text-sm" for="name">Firstname</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          v-model="firstName"
          placeholder="Your first name"
          autocomplete="off"
        />
      </fieldset>
      <fieldset class="block">
        <label class="inline-block w-24 text-sm" for="name">Lastname</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          v-model="lastName"
          placeholder="Your last name"
          autocomplete="off"
        />
      </fieldset>
      <fieldset class="block">
        <label class="inline-block w-24 text-sm" for="email">E-Mail</label>
        <input
          type="email"
          name="email"
          id="email"
          v-model="email"
          placeholder="Your e-mail"
          autocomplete="off"
        />
      </fieldset>
      <fieldset class="block">
        <label class="inline-block w-24 text-sm" for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
          placeholder="Your password"
          autocomplete="off"
        />
      </fieldset>

      <loading></loading>

      <input type="submit" value="Register" class="px-5 mt-8 cursor-pointer" />

      <error-renderer :errors="errors"></error-renderer>

      <div class="flex flex-col items-center justify-content-center">
        <span>or</span>
        <router-link :to="'login'" class="text-lightBlue-600"
          >Log-In</router-link
        >
      </div>
    </form>
  </div>
</template>

<script>
import Loading from "../components/Loading.vue";
import ErrorRenderer from "../components/ErrorRenderer.vue";
import AuthService from "../services/AuthService";
import { errorFormatter } from "../helpers";

export default {
  components: { Loading, ErrorRenderer },
  data: () => ({
    // state
    errors: [],
    loading: false,

    // form state
    password: "111111",
    firstName: "Sean",
    lastName: "Moghadam",
    email: "sean@du.digital",
  }),
  methods: {
    submitRegister: async function (event) {
      event.preventDefault();

      this.loading = true;
      this.errors = [];
      try {
        const token = await AuthService.register({
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
        });
        if (token) {
          this.$toast.success("I'm an info toast!");
          this.$router.push("login");
        }
      } catch (e) {
        console.error(e);
        this.errors = errorFormatter(e);
      }
    },
  },
};
</script>
