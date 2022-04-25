<template>
  <navigation
    v-on:removeBookFromCart="removeBookFromCart"
    :cart="cart"
  ></navigation>
  <main class="mt-16">
    <div id="BookListingPage" class="max-w-3xl m-auto">
      <h1 class="mt-8 mb-4 text-xl">Our Books</h1>
      <loading></loading>
      <ul class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="book in books"
          :key="book.id"
          class="flex flex-col w-full p-4 mb-2 overflow-hidden rounded shadow-lg"
        >
          <h2 class="mb-2 font-semibold truncate">{{ book.title }}</h2>
          <div class="relative flex flex-row justify-between">
            <div>
              <img
                :src="book.thumbnailUrl"
                :alt="book.title"
                class="block h-20 rounded-sm"
              />
            </div>
            <div>
              <p class="text-sm">
                <span class="font-bold">Price:</span>
                {{ formatPrice(book.price) }}
              </p>
              <p class="mb-12 text-sm">
                <span class="font-bold">Date:</span>
                {{ formatDate(book.publishedDate) }}
              </p>
              <button
                @click="addBookToCart(book)"
                class="absolute px-4 py-1 mt-1 font-bold text-white bg-green-500 rounded hover:red-700 right-1 bottom-1"
              >
                Add
              </button>
            </div>
          </div>
          <p class="text-sm">
            <span class="font-bold"
              >{{ book.authors?.length > 1 ? "Authors" : "Author" }}:</span
            >
            {{ book?.authors?.join(", ") }}
          </p>
        </li>
      </ul>
      <error-renderer :errors="errors"></error-renderer>
    </div>
  </main>
</template>

<script>
import Loading from "../components/Loading.vue";
import ErrorRenderer from "../components/ErrorRenderer.vue";
import BookService from "../services/BookService";
import Navigation from "../components/Navigation.vue";
import { errorFormatter } from "../helpers";
import { format } from "date-fns";

export default {
  components: { Loading, ErrorRenderer, Navigation },
  data: () => ({
    // app specific state
    errors: [],
    loading: false,

    // content specific state
    books: [],
    cart: [],
  }),
  // on mount -> fetch books
  async mounted() {
    await this.getBooks();
  },
  methods: {
    // method fetch books
    getBooks: async function () {
      this.loading = true;
      this.errors = [];
      try {
        this.books = await BookService.getBooks();
      } catch (e) {
        this.errors = errorFormatter(e);
      }
      this.loading = false;
    },
    addBookToCart: function (book) {
      const updatedCart = [...this.cart];
      updatedCart.push(book);
      this.cart = updatedCart;
    },
    removeBookFromCart: function (index) {
      const updatedCart = [...this.cart];
      updatedCart.splice(index, 1);
      this.cart = updatedCart;
    },
    formatPrice: function (price) {
      const formatter = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      });
      return formatter.format(price);
    },
    formatDate: function (publishedDate) {
      if (!publishedDate) return "";
      return format(new Date(publishedDate.$date), "dd.MM.yyyy");
    },
  },
};
</script>
