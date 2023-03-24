import { NODE_ENV, ENV_TYPE } from "./_env-config";

let FE_PROTOCOL: string;
let FE_SUBDOMAIN: string;
let FE_DOMAIN: string;
let FE_TOP_LEVEL_DOMAIN: string;
let FE_PORT: string;
let FE_BASE_URL: string;
let FE_WWW_BASE_URL: string;
let FE_FULL_BASE_URL: string;

if (ENV_TYPE === "local") {
    FE_PROTOCOL = "http";
    FE_SUBDOMAIN = "www";
    FE_DOMAIN = "localhost";
    FE_TOP_LEVEL_DOMAIN = "com";
    FE_PORT = "3000";
    FE_BASE_URL = `${FE_DOMAIN}.${FE_TOP_LEVEL_DOMAIN}:${FE_PORT}`;
    FE_WWW_BASE_URL = `${FE_SUBDOMAIN}.${FE_DOMAIN}.${FE_TOP_LEVEL_DOMAIN}:${FE_PORT}`;
    FE_FULL_BASE_URL = `${FE_PROTOCOL}://${FE_WWW_BASE_URL}`;
} else {
    FE_PROTOCOL = "https";
    FE_SUBDOMAIN = "www";
    FE_DOMAIN = NODE_ENV == "production" ? "effie" : "dev.effie";
    FE_TOP_LEVEL_DOMAIN = "boo";
    FE_BASE_URL = `${FE_DOMAIN}.${FE_TOP_LEVEL_DOMAIN}`;
    FE_WWW_BASE_URL = `${FE_SUBDOMAIN}.${FE_DOMAIN}.${FE_TOP_LEVEL_DOMAIN}`;
    FE_FULL_BASE_URL = `${FE_PROTOCOL}://${FE_WWW_BASE_URL}`;
}

export {
    FE_PROTOCOL,
    FE_SUBDOMAIN,
    FE_DOMAIN,
    FE_TOP_LEVEL_DOMAIN,
    FE_PORT,
    FE_BASE_URL,
    FE_WWW_BASE_URL,
    FE_FULL_BASE_URL,
};
