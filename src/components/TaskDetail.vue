<script setup lang="ts">
import { ref, watch } from '@vue/runtime-core';
import type { Task } from '@/types/Task';
import { cloneDeep } from 'lodash';
import Button from '@/components/ui-components/Button.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import type { DatePickerInstance } from "@vuepic/vue-datepicker"
import { onMounted } from 'vue';

const props = defineProps({
    showTask: {
        type: Boolean,
        required: true
    },
    task: {
        type: Object as () => Task,
        required: true
    },
});

const isDark = ref(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
const datepicker = ref<DatePickerInstance>(null);

const emits = defineEmits(['handleSubmitTask', 'handleCancelTask']);

const selectedTask = ref<Task>({
    name: '',
    description: '',
    day: new Date(),
});

const handleSubmit = () => {
    emits('handleSubmitTask', selectedTask.value);
};

watch(() => props.task, (newVal:Task) => {    
    selectedTask.value = cloneDeep(newVal);
}, {immediate: true});

onMounted(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        console.log('matchMedia', e);
        isDark.value = e.matches;
    });
});

</script>

<template>
    <form v-if="showTask" class="add-form" @submit="handleSubmit">
        <div class="form-control">
            <label for="name">Name</label>
            <input type="text" v-model="selectedTask.name" id="name" name="name" placeholder="Add name" />
        </div>
        <div class="form-control">
            <label for="description">Description</label>
            <input type="text" v-model="selectedTask.description" id="description" name="description" placeholder="Add description" />
        </div>
        <div class="form-control">
            <label for="day">Day & Time</label>
            <VueDatePicker
                ref="datepicker"
                v-model="selectedTask.day"
                id="day"
                name="day"
                placeholder="Add day & time"
                :dark="isDark"
            />
        </div>
        <div class="form-controle">
            <Button
                type="button"
                :color="selectedTask.id ? 'darkgreen' : 'green'"
                :text="selectedTask.id ? 'Save' : 'Add'"
                :disabled="!selectedTask.name || !selectedTask.description || !selectedTask.day"
                @click="handleSubmit"
            />
        </div>
    </form>
</template>

<style lang="scss" scoped>
.add-form {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    margin: 0 auto 2rem;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    background-color: #34495E;
}

.form-control {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    margin: 20px 0;
    #day {
        width: inherit;
        margin: 5px;
        background-color: #242424;
        border-radius: 5px;
    }
}

.form-control label {
    color: white;
    display: block;
}

.form-control input {
    background-color: #242424;
    color: #fff;
    height: 40px;
    margin: 5px;
    padding: 3px 7px;
    font-size: 17px;
    border: none;
    border-radius: 5px;
}

@media (prefers-color-scheme: light) {
    .add-form {
        background-color: #fff;
    }
    .form-control input {
        background-color: #fff;
        color: #242424;
    }
}

</style>