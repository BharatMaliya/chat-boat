import { API_SERVICE, ENDPOINTS } from "../common/endpoints";
import { logger } from "../utils/logger";
import { BaseAPIService } from "./base-api";

export interface ClientConfig {
    theme: {
        primaryColor: string;
        headerGradient: string;
        backgroundColor: string;
    },
    initialMessages: {
        id: number;
        sender: "bot" | "user";
        text: string;
    }[],
    userName: string;
}

export interface BusinessVerificationRequest {
    businessId: string;
    origin: string;
}

export interface BusinessVerificationResponse {
    verified: boolean;
    businessId: string;
    message?: string;
    // Add other expected response fields based on your API documentation
}

class HttpService extends BaseAPIService {
    constructor() {
        super(API_SERVICE.MAIN);
    }

    public async getClientConfig(cxId: string): Promise<ClientConfig | null> {
        logger.info("Fetching client config for:", cxId);

        const [response, error] = await this.request<ClientConfig>({
            url: ENDPOINTS.CLIENT_CONFIG(cxId),
        });

        if (error) {
            logger.error(`Failed to fetch client config for ${cxId}`, error);
            return null;
        }

        return response;
    }
}

class BusinessApiService extends BaseAPIService {
    constructor() {
        super(API_SERVICE.BUSINESS);
    }

    public async verifyBusiness(businessId: string, origin: string): Promise<BusinessVerificationResponse | null> {
        logger.info("Verifying business:", businessId, "for origin:", origin);

        const requestData: BusinessVerificationRequest = {
            businessId,
            origin
        };

        const [response, error] = await this.request<BusinessVerificationResponse>({
            method: 'POST',
            url: ENDPOINTS.BUSINESS_VERIFY,
            data: requestData,
            encryption: false // No encryption for business API
        });

        if (error) {
            logger.error(`Failed to verify business ${businessId}`, error);
            return null;
        }

        return response;
    }
}

// Export service instances
export const httpService = new HttpService();
export const businessApiService = new BusinessApiService(); 