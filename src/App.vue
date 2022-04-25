<template>
  <div id="app">
    <book-listing></book-listing>
  </div>
</template>

<script>
import BookListing from "./views/index.vue";
export default {
  components: { BookListing },
};
</script>

<style>
.message {
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  color: blue;
}
</style>
