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
            black: "var(--color-black)",
            white: "var(--color-white)",
            neutral: {
                50: "var(--color-neutral-50)",
                100: "var(--color-neutral-100)",
                200: "var(--color-neutral-200)",
                300: "var(--color-neutral-300)",
                400: "var(--color-neutral-400)",
                500: "var(--color-neutral-500)",
                600: "var(--color-neutral-600)",
                700: "var(--color-neutral-700)",
                800: "var(--color-neutral-800)",
                900: "var(--color-neutral-900)",
            },
            primary: {
                50: "var(--color-primary-50)",
                100: "var(--color-primary-100)",
                200: "var(--color-primary-200)",
                300: "var(--color-primary-300)",
                400: "var(--color-primary-400)",
                500: "var(--color-primary-500)",
                600: "var(--color-primary-600)",
                700: "var(--color-primary-700)",
                800: "var(--color-primary-800)",
                900: "var(--color-primary-900)",  
            },
            secondary: {
                50: "var(--color-secondary-50)",
                200: "var(--color-secondary-200)",
                500: "var(--color-secondary-500)",
                700: "var(--color-secondary-700)",
                900: "var(--color-secondary-900)",
            },
            tertiary: {
                50: "var(--color-tertiary-50)",
                200: "var(--color-tertiary-200)",
                500: "var(--color-tertiary-500)",
                700: "var(--color-tertiary-700)",
                900: "var(--color-tertiary-900)",
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
                /(bg|border)-(danger|success|warning|info|primary)-(100|300|500|700|900)/,
            variants: ["hover"],
        },
    ],
};
