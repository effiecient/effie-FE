// export const BE_BASE_URL = "http://localhost:3001/api";
export const BE_BASE_URL = 
    process.env.VERCEL_ENV === "production" || process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
        ? "https://api.effie.boo/api"
        : "https://dev.api.effie.boo/api";

export const BE_STATUS_SUCCESS = "SUCCESS";
export const BE_STATUS_ERROR = "ERROR";
