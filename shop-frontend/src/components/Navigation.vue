<template>
    <nav
        class="relative select-none lg:flex lg:items-stretch w-full bg-gray-800"
    >
        <div
            class="flex flex-no-shrink items-stretch h-12 list-none text-white py-3 max-w-xl m-auto w-full items-center"
        >
            <div class="flex justify-content-between w-full items-center">
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
                        <a :href="href" class="pr-5" @click="navigate"
                            >Register</a
                        >
                    </li>
                </router-link>
            </div>
            <cart-modal :is-logged-in="isLoggedIn"></cart-modal>
            <button
                class="bg-red-500 hover:red-700 text-white font-bold py-1 px-4 rounded text-xs ml-2"
                v-if="isLoggedIn"
                @click="logout"
            >
                Logout
            </button>
        </div>
    </nav>
</template>

<script>
import { isLoggedIn, logout } from "./../helpers";
import CartModal from './CartModal.vue';
export default {
  components: { CartModal },
    data: () => ({
        isLoggedIn: isLoggedIn(),
    }),
    methods: {
        logout: function() {
            logout();
            this.$router.push("/login");
        },
        setupData: function() {
            this.isLoggedIn = isLoggedIn();
        },
    },
    watch: {
        $route() {
            this.setupData();
        },
    },
};
</script>
