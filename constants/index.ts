export const EFFIE_AUTH_TOKEN =
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
        ? "authToken"
        : "devAuthToken";
