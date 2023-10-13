<script setup lang="ts">
    
    defineProps({
        text: {
            type: String,
            default: 'Button'
        },
        color: {
            type: String,
            default: '#000'
        },
        onClick: {
            type: Function,
            default: () => {}
        }
    });
    
</script>

<template>
    <button
        :style="{'background-color': color }"
        class="btn"
        @click="onClick()">{{ text }}
    </button>
</template>