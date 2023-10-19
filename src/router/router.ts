import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: () => import('@/App.vue'),
    },
    // Add your routes here

    {
        path: '/home',
        component: () => import('@/pages/Home.vue'),
    },
    {
        path: '/about',
        component: () => import('@/pages/About.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
