// API Base URLs from environment variables
export const API_BASE_URLS = {
    MAIN: import.meta.env.VITE_API_BASE_URL || "/api",
    BUSINESS: import.meta.env.VITE_BUSINESS_API_BASE_URL || "https://b2b-devapi.tripkliq.com/api",
} as const;

// API Endpoints
export const ENDPOINTS = {
    // Main API endpoints
    CLIENT_CONFIG: (cxId: string) => `/clients/${cxId}/config`,

    // Business API endpoints
    BUSINESS_VERIFY: "/business/verify",
} as const;

// API Services enum for identifying which base URL to use
export enum API_SERVICE {
    MAIN,
    BUSINESS,
};