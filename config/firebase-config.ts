export const FIREBASE_CONFIG = {
    // swap all of these object and change the condition to === "production"
    // to use the production config
    apiKey:
        process.env.VERCEL_ENV == "production"
            ? "AIzaSyBIlSbwlKUovrLptRCcByKoesYU8rZXMlw"
            : "AIzaSyDJxdWsoTvciQBfw2OIa0jvuR9l_xEAIls",
    authDomain:
        process.env.VERCEL_ENV == "production"
            ? "effie-be.firebaseapp.com"
            : "effie-be-dev.firebaseapp.com",
    projectId:
        process.env.VERCEL_ENV == "production" ? "effie-be" : "effie-be-dev",
    storageBucket:
        process.env.VERCEL_ENV == "production"
            ? "effie-be.appspot.com"
            : "effie-be-dev.appspot.com",
    messagingSenderId:
        process.env.VERCEL_ENV == "production"
            ? "1094450506359"
            : "1047258247146",
    appId:
        process.env.VERCEL_ENV == "production"
            ? "1:1094450506359:web:6f7b97eefc899603dd3472"
            : "1:1047258247146:web:639f0e3011277a57cb8c93",
    measurementId:
        process.env.VERCEL_ENV == "production"
            ? "G-9670T0JENL"
            : "G-ERZQTH8T4V",
};
