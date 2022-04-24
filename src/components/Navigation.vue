<template>
  <nav
    class="fixed top-0 z-50 w-full bg-gray-800 select-none lg:flex lg:items-stretch"
  >
    <div
      class="relative flex items-center w-full h-12 max-w-3xl py-3 m-auto text-white list-none flex-no-shrink"
    >
      <div class="flex items-center w-full justify-content-between">
        <router-link
          to="/"
          v-if="isLoggedIn"
          v-slot="{ href, navigate, isActive, isExactActive }"
        >
          <li
            :class="[
              isActive && 'router-link-active',
              isExactActive && 'router-link-exact-active',
            ]"
          >
            <a :href="href" class="pr-5" @click="navigate">Home</a>
          </li>
        </router-link>
        <router-link
          to="/login"
          v-slot="{ href, navigate, isActive, isExactActive }"
          v-if="!isLoggedIn"
        >
          <li
            :class="[
              isActive && 'router-link-active',
              isExactActive && 'router-link-exact-active',
            ]"
          >
            <a :href="href" class="pr-5" @click="navigate">Login</a>
          </li>
        </router-link>
        <router-link
          to="/register"
          v-slot="{ href, navigate, isActive, isExactActive }"
          v-if="!isLoggedIn"
        >
          <li
            :class="[
              isActive && 'router-link-active',
              isExactActive && 'router-link-exact-active',
            ]"
          >
            <a :href="href" class="pr-5" @click="navigate">Register</a>
          </li>
        </router-link>
      </div>
      <cart-modal :is-logged-in="isLoggedIn"></cart-modal>

      <button
        class="px-4 py-1 ml-2 font-bold text-white bg-red-500 rounded hover:red-700"
        v-if="isLoggedIn"
        @click="logout"
      >
        Logout
      </button>
      <user-batch
        v-if="userData"
        :user-data="userData"
        :is-logged-in="isLoggedIn"
      ></user-batch>
    </div>
  </nav>
</template>

<script>
import AuthService from "../services/AuthService";
import CartModal from "./CartModal.vue";
import UserBatch from "./UserBatch.vue";

export default {
  components: { CartModal, UserBatch },
  data: () => ({
    isLoggedIn: AuthService.isLoggedIn(),
    userData: null,
  }),
  mounted: async function () {},
  methods: {
    logout: function () {
      AuthService.logout();
      this.$router.push("/login");
    },
    setupData: async function () {
      this.isLoggedIn = AuthService.isLoggedIn();
      this.userData = await AuthService.getUserData();
    },
  },
  watch: {
    $route() {
      this.setupData();
    },
  },
};
</script>
