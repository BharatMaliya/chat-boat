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

class HttpService extends BaseAPIService {
    constructor() {
        super();
    }

    public async getClientConfig(cxId: string): Promise<ClientConfig | null> {
        logger.info("Fetching client config for:", cxId);

        const [response, error] = await this.request<ClientConfig>({
            url: `/clients/${cxId}/config`,
        });

        if (error) {
            logger.error(`Failed to fetch client config for ${cxId}`, error);
            return null;
        }

        return response;
    }
}

export const httpService = new HttpService(); 