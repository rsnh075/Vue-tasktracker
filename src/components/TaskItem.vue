<script setup lang="ts">
import type { Task } from '@/types/Task';
import { Delete } from 'mdue';

defineProps({
    task: {
        type: Object as () => Task,
        required: true
    },
});

const emits = defineEmits(['onDelete', 'onToggle']);

function deleteTask(task: Task) {
    emits('onDelete', task)
}

function toggleTask(task: Task) {
    emits('onToggle', task)
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(date);
}

</script>

<template>
    <div
        class="task"
        @click="toggleTask(task)"
    >
        <h3>{{ task.name }}
            <Delete 
                class="delete-btn"
                @click.stop="deleteTask(task)"
            ></Delete>
        </h3>
        <p>{{ task.description }}</p>
        <p>{{ formatDate(task.day) }}</p>
    </div>
</template>

<style lang="scss" scoped>
.task {
  background: #41B883;
  color: rgb(239, 250, 243);
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
  h3, p {
    margin: 5px 0;
  }
}

.task.selected {
  border-left: 5px solid green;
}

.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.task .delete-btn {
    color: red;
    padding: 0.5rem;
    cursor: pointer;
    transition: color 0.15s ease-in-out;
}

.task .delete-btn:hover {
    color: #fff;
}

@media (prefers-color-scheme: light) {
    .task {
        color: #f4f4f4;
    }
}
</style>