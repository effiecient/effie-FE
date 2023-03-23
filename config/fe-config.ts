// export const FE_PROTOCOL = "http";

// export const FE_SUBDOMAIN = "www";
// export const FE_DOMAIN = "example";
// export const FE_TOP_LEVEL_DOMAIN = "com";
// export const FE_PORT = "3000";

// export const FE_BASE_URL = `${FE_DOMAIN}.${FE_TOP_LEVEL_DOMAIN}:${FE_PORT}`;
// export const FE_WWW_BASE_URL = `${FE_SUBDOMAIN}.${FE_DOMAIN}.${FE_TOP_LEVEL_DOMAIN}:${FE_PORT}`;

// export const FE_FULL_BASE_URL = `${FE_PROTOCOL}://${FE_WWW_BASE_URL}`;

export const FE_PROTOCOL = "https";

export const FE_SUBDOMAIN = "www";
export const FE_DOMAIN =
    process.env.VERCEL_ENV === "production" ? "effie" : "dev.effie";
export const FE_TOP_LEVEL_DOMAIN = "boo";

export const FE_BASE_URL = `${FE_DOMAIN}.${FE_TOP_LEVEL_DOMAIN}`;
export const FE_WWW_BASE_URL = `${FE_SUBDOMAIN}.${FE_DOMAIN}.${FE_TOP_LEVEL_DOMAIN}`;

export const FE_FULL_BASE_URL = `${FE_PROTOCOL}://${FE_BASE_URL}`;
