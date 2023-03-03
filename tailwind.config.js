/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
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
            black: "#000000",
            white: "#FFFFFF",
            neutral: {
                50: "#F8F9FA",
                100: "#EDF0F3",
                200: "#E1E7EC",
                300: "#CFD6DE",
                400: "#B8C4CE",
                500: "#A0ADBB",
                600: "#8895A7",
                700: "#667181",
                800: "#434D5A",
                900: "#212934",
            },
            primary: {
                50: "#EEEAFF",
                100: "#D4CDF2",
                200: "#B9AFE6",
                300: "#9F92D9",
                400: "#8474CC",
                500: "#7766C6",
                600: "#6C5BBA",
                700: "#6150AD",
                800: "#5545A1",
                900: "#4A3A94",
            },
            secondary: {
                50: "#FFEEF3",
                200: "#FCCFDB",
                500: "#F9B0C3",
                700: "#C86D85",
                900: "#962A46",
            },
            tertiary: {
                50: "#FFF2CD",
                200: "#FFDA70",
                500: "#FFC212",
                700: "#BE9009",
                900: "#7D5D00",
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
};
