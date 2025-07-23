import axios from "axios";
import { logger } from "../utils/logger";

export interface ApiRequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    url: string;
    data?: unknown;
    config?: {
        headers?: Record<string, string>;
        timeout?: number;
        [key: string]: unknown;
    };
    encryption?: boolean;
}

export interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
}

export interface ApiError {
    message: string;
    status?: number;
    statusText?: string;
    response?: {
        data: unknown;
        status: number;
        statusText: string;
    };
}

export class BaseAPIService {
    private axiosInstance: ReturnType<typeof axios.create>;
    private apiToken: string | null = null;

    constructor(baseURL: string = "/api") {
        this.axiosInstance = axios.create({
            baseURL,
            withCredentials: true,
        });
        this.apiToken = "mock-initial-token";
    }

    public async request<T>({
        method = 'GET',
        url,
        data,
        config,
        encryption = true,
    }: ApiRequestOptions): Promise<[T | null, ApiError | null]> {
        let responseData: T | null = null;
        let error: ApiError | null = null;

        const headers = {
            'Content-Type': 'application/json',
            ...this.getAuthHeaders(),
            ...config?.headers,
        };

        const requestData = data && ['POST', 'PUT', 'PATCH'].includes(method)
            ? (encryption ? await this.encrypt(data) : data)
            : undefined;

        try {
            const requestConfig = {
                method,
                url,
                headers,
                data: requestData as T | undefined,
                ...(config || {}),
            };
            const res = await this.axiosInstance.request<T>(requestConfig);
            responseData = encryption ? await this.decrypt<T>(res.data) : res.data;
        } catch (err: unknown) {
            const axiosError = err as { isAxiosError?: boolean; response?: { status: number; statusText: string; data: unknown }; message: string };

            if (axiosError.isAxiosError && axiosError.response?.status === 401) {
                logger.warn("Token expired, attempting to refresh...");
                try {
                    const newToken = await this.resetToken();
                    if (newToken) {
                        const retryRequestConfig = {
                            method,
                            url,
                            headers: { ...headers, Authorization: `Bearer ${newToken}` },
                            data: requestData as T | undefined,
                            ...(config || {}),
                        };
                        const retryRes = await this.axiosInstance.request<T>(retryRequestConfig);
                        responseData = encryption ? await this.decrypt<T>(retryRes.data) : retryRes.data;
                        error = null;
                    }
                } catch (refreshError: unknown) {
                    logger.error("Failed to refresh token", refreshError);
                    error = {
                        message: refreshError instanceof Error ? refreshError.message : 'Unknown refresh error',
                    };
                }
            } else {
                logger.error("API request failed", err);
                error = {
                    message: axiosError.message || 'Unknown API error',
                    status: axiosError.response?.status,
                    statusText: axiosError.response?.statusText,
                    response: axiosError.response ? {
                        data: axiosError.response.data,
                        status: axiosError.response.status,
                        statusText: axiosError.response.statusText,
                    } : undefined,
                };
            }
        }

        return [responseData, error];
    }

    private async resetToken(): Promise<string | null> {
        logger.info("Refreshing API token...");
        await new Promise(resolve => setTimeout(resolve, 500));
        this.apiToken = `mock-refreshed-token-${Date.now()}`;
        logger.info("API token refreshed:", this.apiToken);
        return this.apiToken;
    }

    protected async encrypt<T>(data: T): Promise<string> {
        logger.debug("Encrypting data:", data);
        return JSON.stringify({ encrypted: data });
    }

    protected async decrypt<T>(encryptedData: unknown): Promise<T> {
        logger.debug("Decrypting data:", encryptedData);
        if (typeof encryptedData === 'string') {
            try {
                const parsed = JSON.parse(encryptedData);
                return parsed.encrypted as T;
            } catch {
                return encryptedData as T;
            }
        }
        if (typeof encryptedData === 'object' && encryptedData !== null && 'encrypted' in encryptedData) {
            return (encryptedData as { encrypted: T }).encrypted;
        }
        return encryptedData as T;
    }

    private getAuthHeaders(): Record<string, string> {
        if (!this.apiToken) return {};
        return { Authorization: `Bearer ${this.apiToken}` };
    }
} 