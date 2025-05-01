import gluestackPlugin from '@gluestack-ui/nativewind-utils/tailwind-plugin';
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './App.{tsx,jsx,ts,js}',
        './index.{tsx,jsx,ts,js}',
        './components/**/*.{tsx,jsx,ts,js}',
        './app/**/*.{tsx,jsx,ts,js}',
        './AppModules/**/*.{tsx,jsx,ts,js}',
        './BaseModule/**/*.{tsx,jsx,ts,js}',
        './MyApp/**/*.{tsx,jsx,ts,js}'
    ],
    presets: [require('nativewind/preset')],
    theme: {
        screens: {
            base: '0',
            xs: '400px',
            sm: '480px',
            ss:"764px",
            md: '768px',
            lg: '1025px',
            xl: '1280px',
            '2xl': '1536px'
        },
        extend: {
          colors: {
            // Light theme colors
            red: 'rgb(var(--color-red)/<alpha-value>)',
            green: 'rgb(var(--color-green)/<alpha-value>)',
            black: 'rgb(var(--color-black)/<alpha-value>)',
            white: 'rgb(var(--color-white)/<alpha-value>)',
            yellow: 'rgb(var(--color-yellow)/<alpha-value>)',
            lightgreen: 'rgb(var(--color-lightgreen)/<alpha-value>)',
            lightyellow: 'rgb(var(--color-lightyellow)/<alpha-value>)',
            textgrey: 'rgb(var(--color-textgrey)/<alpha-value>)',
            lightgrey: 'rgb(var(--color-lightgrey)/<alpha-value>)',
            backgroundgrey: 'rgb(var(--color-backgroundgrey)/<alpha-value>)',
            divider: 'rgb(var(--color-divider)/<alpha-value>)',

            // Dark theme colors
            dred: 'rgb(var(--color-dred) / <alpha-value>)',
            dgrey: 'rgb(var(--color-dgrey) / <alpha-value>)',
            dgreen: 'rgb(var(--color-dgreen) / <alpha-value>)',
            dlightgreen: 'rgb(var(--color-dlightgreen) / <alpha-value>)',
            dcard: 'rgb(var(--color-dcard) / <alpha-value>)',
            dwhite: 'rgb(var(--color-dwhite) / <alpha-value>)',
            dyellow: 'rgb(var(--color-dyellow) / <alpha-value>)',
            dlightyellow: 'rgb(var(--color-dlightyellow) / <alpha-value>)',
            dtextgrey: 'rgb(var(--color-dtextgrey) / <alpha-value>)'
        }, 
           
        }
    },
    plugins: [gluestackPlugin]
};
