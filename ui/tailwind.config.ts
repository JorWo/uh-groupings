import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'uh-black': '#212121',
                'uh-teal': '#0d7078'
            },
            fontFamily: {
                sans: ['var(--font-source-sans-3)']
            }
        },
        screens: {
            'xs': '36em',
            'sm': '48em',
            'md': '62em',
            'lg': '75em',
            'xl': '88em'
        }
    },
    plugins: [],
};

export default config;
