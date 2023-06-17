/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./ui/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./features/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            sm: "480px",
            md: "768px",
            lg: "976px",
            xl: "1440px",
        },
        colors: {
            transparent: "transparent",
            current: "currentColor",
            black: "rgba(var(--color-black), var(--tw-bg-opacity))",
            white: "rgba(var(--color-white), var(--tw-bg-opacity))",
            neutral: {
                50: "rgba(var(--color-neutral-50), var(--tw-bg-opacity))",
                100: "rgba(var(--color-neutral-100), var(--tw-bg-opacity))",
                200: "rgba(var(--color-neutral-200), var(--tw-bg-opacity))",
                300: "rgba(var(--color-neutral-300), var(--tw-bg-opacity))",
                400: "rgba(var(--color-neutral-400), var(--tw-bg-opacity))",
                500: "rgba(var(--color-neutral-500), var(--tw-bg-opacity))",
                600: "rgba(var(--color-neutral-600), var(--tw-bg-opacity))",
                700: "rgba(var(--color-neutral-700), var(--tw-bg-opacity))",
                800: "rgba(var(--color-neutral-800), var(--tw-bg-opacity))",
                900: "rgba(var(--color-neutral-900), var(--tw-bg-opacity))",
            },
            primary: {
                50: "rgba(var(--color-primary-50), var(--tw-bg-opacity))",
                100: "rgba(var(--color-primary-100), var(--tw-bg-opacity))",
                200: "rgba(var(--color-primary-200), var(--tw-bg-opacity))",
                300: "rgba(var(--color-primary-300), var(--tw-bg-opacity))",
                400: "rgba(var(--color-primary-400), var(--tw-bg-opacity))",
                500: "rgba(var(--color-primary-500), var(--tw-bg-opacity))",
                600: "rgba(var(--color-primary-600), var(--tw-bg-opacity))",
                700: "rgba(var(--color-primary-700), var(--tw-bg-opacity))",
                800: "rgba(var(--color-primary-800), var(--tw-bg-opacity))",
                900: "rgba(var(--color-primary-900), var(--tw-bg-opacity))",
            },
            secondary: {
                50: "rgba(var(--color-secondary-50), var(--tw-bg-opacity))",
                200: "rgba(var(--color-secondary-200), var(--tw-bg-opacity))",
                500: "rgba(var(--color-secondary-500), var(--tw-bg-opacity))",
                700: "rgba(var(--color-secondary-700), var(--tw-bg-opacity))",
                900: "rgba(var(--color-secondary-900), var(--tw-bg-opacity))",
            },
            tertiary: {
                50: "rgba(var(--color-tertiary-50), var(--tw-bg-opacity))",
                200: "rgba(var(--color-tertiary-200), var(--tw-bg-opacity))",
                500: "rgba(var(--color-tertiary-500), var(--tw-bg-opacity))",
                700: "rgba(var(--color-tertiary-700), var(--tw-bg-opacity))",
                900: "rgba(var(--color-tertiary-900), var(--tw-bg-opacity))",
            },
            danger: {
                50: "#F8E5E5",
                100: "#F3A9A9",
                200: "#E46464",
                300: "#DA3030",
                400: "#B72020",
                500: "#881B1B",
                600: "#601818",
            },
            warning: {
                50: "#FFFCF4",
                100: "#FDF3D7",
                200: "#FAE29F",
                300: "#F4CA64",
                400: "#CAA53D",
                500: "#8C6D1F",
                600: "#5C4813",
            },
            success: {
                50: "#E3FCEC",
                100: "#A8EEC1",
                200: "#74D99F",
                300: "#38C172",
                400: "#259D58",
                500: "#197741",
                600: "#155239",
            },
            info: {
                50: "#EFF8FF",
                100: "#AAD4F5",
                200: "#63A2D8",
                300: "#3183C8",
                400: "#2368A2",
                500: "#1A4971",
                600: "#203D54",
            },
            fontFamily: {
                sans: ["Graphik", "sans-serif"],
                serif: ["Merriweather", "serif"],
            },
            // scroll disable scrollkit
            //
        },
        extend: {},
    },
    plugins: [],
    safelist: [
        {
            // bg-danger-, bg-success, bg-warning, bg-info
            // border-danger-, border-success, border-warning, border-info
            pattern:
                /(bg|border)-(danger|success|warning|info|primary)-(50|100|300|500|700|900)/,
            variants: ["hover"],
        },
        {
            // all fill classes
            pattern:
                /fill-(danger|success|warning|info|primary|secondary|tertiary|neutral)-(50|100|200|300|400|500|600|700|800|900)/,
            variants: ["hover"],
        },
        "fill-white",
        "fill-black",
    ],
};
