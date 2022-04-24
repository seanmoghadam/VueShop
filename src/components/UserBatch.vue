<template>
  <span
    v-if="firstName && lastName"
    class="p-1 ml-4 text-black bg-white rounded-full"
    >{{ capitals }}
  </span>
</template>
<script>
export default {
  props: ["userData"],
  setup: (props) => {
    return {
      firstName: props.userData.firstName,
      lastName: props.userData.lastName,
    };
  },
  computed: {
    capitals: function () {
      return `${this.getUcFirstLetter(this.firstName)}${this.getUcFirstLetter(
        this.lastName
      )}`;
    },
  },
  methods: {
    getUcFirstLetter: (str) => {
      return str.substring(1, 0).toUpperCase();
    },
  },
};
</script>
