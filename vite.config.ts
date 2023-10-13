// https://vitejs.dev/config/
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    root    : './',
	base    : './',
    resolve : {
        alias: {
            '@' : './src'
        }
    },
    server:{
        open:true,
        port:3000
    }
})

