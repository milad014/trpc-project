import { defineConfig } from 'windicss/helpers'

export default defineConfig({
    theme: {
        extend: {},
    },
    content: ['./src/**/*.{js,ts,jsx,tsx}'],

    // add daisyUI plugin
    plugins: [require('daisyui')],
})
