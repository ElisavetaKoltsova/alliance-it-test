import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        hmr: {
            protocol: 'ws',
            host: '127.0.0.1',
            clientPort: 5173,
        },
    },
});
