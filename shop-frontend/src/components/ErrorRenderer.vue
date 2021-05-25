<template>
    <ul id="errors" class=" mt-5 text-red-600">
        <li v-for="error in errors" :key="error">
            {{ error }}
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        errors: Array,
    },
};
</script>
