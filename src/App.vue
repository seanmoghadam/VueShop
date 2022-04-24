<template>
  <div id="app">
    <navigation></navigation>
    <main class="mt-16">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
export default {
  components: { Navigation },
};
</script>

<style>
.message {
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  color: blue;
}
</style>
