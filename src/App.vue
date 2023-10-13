<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter(),
      isLoaded = ref(false),
      loader = ref('.');

function updateLoader() {
    const loaderUpdate = setTimeout(() => {
        if (!isLoaded.value) {
            updateLoader();
            loader.value += '.';
            if (loader.value.length > 3) {
                isLoaded.value = true;
                router.push('/home');
                clearTimeout(loaderUpdate);
            }
        }
    }, 500);
}

onMounted(() => {
    updateLoader();
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Dark mode is preferred
    } else {
    // Light mode is preferred
    }
});

</script>

<template>
    <router-view v-if="isLoaded"></router-view>
    <div v-if="!isLoaded" class="loader">
        <p>{{ loader }}</p>
    </div>
</template>

<style scoped>
.loader {
    margin: 0;
    display: flex;
    place-items: center;
    place-content: center;
}

</style>
