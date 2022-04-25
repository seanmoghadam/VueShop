<template>
  <nav
    class="fixed top-0 z-50 w-full bg-gray-800 select-none lg:flex lg:items-stretch"
  >
    <div
      class="relative flex items-center w-full h-12 max-w-3xl py-3 m-auto text-white list-none flex-no-shrink"
    >
      <div class="flex items-center w-full justify-content-between">
        <!-- add links -->
      </div>
      <cart-modal
        v-on:removeBookFromCart="removeBookFromCart"
        :cart="cart"
      ></cart-modal>
    </div>
  </nav>
</template>

<script>
import CartModal from "./CartModal.vue";

export default {
  components: { CartModal },
  props: {
    cart: {
      type: Array,
    },
  },
  methods: {
    removeBookFromCart: function (index) {
      this.$emit("removeBookFromCart", index);
    },
  },
};
</script>
