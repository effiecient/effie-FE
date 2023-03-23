export const FIREBASE_CONFIG = {
    apiKey:
        process.env.VERCEL_ENV === "development"
            ? "AIzaSyDJxdWsoTvciQBfw2OIa0jvuR9l_xEAIls"
            : "AIzaSyBIlSbwlKUovrLptRCcByKoesYU8rZXMlw",
    authDomain:
        process.env.VERCEL_ENV === "development"
            ? "effie-be-dev.firebaseapp.com"
            : "effie-be.firebaseapp.com",
    projectId:
        process.env.VERCEL_ENV === "development" ? "effie-be-dev" : "effie-be",
    storageBucket:
        process.env.VERCEL_ENV === "development"
            ? "effie-be-dev.appspot.com"
            : "effie-be.appspot.com",
    messagingSenderId:
        process.env.VERCEL_ENV === "development"
            ? "1047258247146"
            : "1094450506359",
    appId:
        process.env.VERCEL_ENV === "development"
            ? "1:1047258247146:web:639f0e3011277a57cb8c93"
            : "1:1094450506359:web:6f7b97eefc899603dd3472",
    measurementId:
        process.env.VERCEL_ENV === "development"
            ? "G-ERZQTH8T4V"
            : "G-9670T0JENL",
};
