import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        WindiCSS({
            scan: {
                // By default only `src/` is scanned
                // We only have to specify the file extensions we actually use.
                fileExtensions: ['vue', 'js', 'ts', 'jsx', 'tsx'],
            },
        }),
    ],
})
