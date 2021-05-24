<template>
    <span
        v-if="loading"
        class="bg-white text-black h-screen w-screen absolute left-0 top-0 flex justify-center items-center"
        >Loading...
    </span>
</template>

<script>
export default {
    data: ({ loading }) => ({
        loading
    }),
};
</script>
