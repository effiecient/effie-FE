import { NODE_ENV } from "@/config/_env-config";
export const EFFIE_AUTH_TOKEN =
    NODE_ENV === "production" ? "authToken" : "devAuthToken";
