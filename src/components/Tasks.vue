<script setup lang="ts">
import { onMounted, ref, watch } from '@vue/runtime-core';
import { Task } from '@/types/Task';
import TaskItem from '@/components/TaskItem.vue';
import TaskDetail from '@/components/TaskDetail.vue';
// import { TASKS } from '../mocks/MockTasks';
import Button from '@/components/ui-components/Button.vue';
import { computed } from 'vue';

// const tasks = ref<Task[]>(TASKS);
const tasks = ref<Task[]>([]);
const storedTasks = ref<Task[]>([]);
const showTask = ref(false);
const selectedTask = ref<Task>({
    id: 0,
    name: '',
    description: '',
    day: '',
});
const colorAddBtn = computed(() => showTask.value ? 'red' : 'green');
const textAddBtn = computed(() => showTask.value ? 'Close' : 'Add');

function getLocalStorage() {
    const localyStoredTasks = localStorage.getItem('storedTasks');
    if (localyStoredTasks) {
        storedTasks.value = JSON.parse(localyStoredTasks);
        tasks.value = storedTasks.value;
    }
}

function setLocalStorage() {
    localStorage.setItem('storedTasks', JSON.stringify(tasks.value));
}

watch(() => tasks.value, () => {
    setLocalStorage();
});

function addTask() {
    selectedTask.value = {
        name: '',
        description: '',
        day: '',
    };
    showTask.value = !showTask.value;
}

function onDeleteTask(tasktodelete: Task) {
    tasks.value = tasks.value.filter(task => task.id != tasktodelete.id);
}

function onToggleTask(task: Task) {
    showTask.value = !showTask.value;
    selectedTask.value = task;
}

function onCancelTask() {
    showTask.value = false;
}

function onSubmitTask(task: Task) {
    if (task.id) {
        tasks.value = tasks.value.map(t => t.id == task.id ? task : t);
    } else {
        task.id = tasks.value.length + 1;
        tasks.value = [...tasks.value, task];
    }
    showTask.value = false;
}

onMounted(() => {
    getLocalStorage();
});

</script>

<template>
    <Button
        :onClick="addTask"
        :color="colorAddBtn"
        :text="textAddBtn"
    />
    <TaskDetail
        :showTask="showTask"
        :task="selectedTask"
        @handleCancelTask="onCancelTask"
        @handleSubmitTask="onSubmitTask"
    />
    <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @onDelete="onDeleteTask"
        @onToggle="onToggleTask"
    />
</template>