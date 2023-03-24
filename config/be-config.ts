let BE_BASE_URL: string;

if (process.env.NEXT_PUBLIC_ENV_TYPE === "local") {
    BE_BASE_URL = "http://localhost:3001/api";
} else {
    BE_BASE_URL =
        process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
            ? "https://api.effie.boo/api"
            : "https://dev.api.effie.boo/api";
}

export { BE_BASE_URL };

export const BE_STATUS_SUCCESS = "SUCCESS";
export const BE_STATUS_ERROR = "ERROR";
