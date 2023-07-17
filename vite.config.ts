import { defineConfig, loadEnv } from 'vite';
import path from 'path';

// jsconfigPaths()
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '.'),
                '~@': path.resolve(__dirname, '.'),
            },
            extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.vue'],
        },
        test: {
            globals: true,
            environment: 'jsdom',
            coverage: {
                reporter: ['text', 'json', 'html', 'lcov'],
                all: true,
            },
            env: {
                TZ: 'Europe/Samara',
            },
        },
    };
});
