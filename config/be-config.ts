import { NODE_ENV, ENV_TYPE } from "./env-config";

let BE_BASE_URL: string;

if (ENV_TYPE === "local") {
    BE_BASE_URL = "http://localhost:3001/api";
} else {
    BE_BASE_URL =
        NODE_ENV === "production"
            ? "https://api.effie.boo/api"
            : "https://dev.api.effie.boo/api";
}

export { BE_BASE_URL };

export const BE_STATUS_SUCCESS = "SUCCESS";
export const BE_STATUS_ERROR = "ERROR";
