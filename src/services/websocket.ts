import { logger } from "../utils/logger";
import { BaseAPIService } from "./base-api";

class WebSocketService extends BaseAPIService {
    private ws: WebSocket | null = null;

    constructor() {
        super();
    }

    public connect(cxId: string): WebSocket {
        const wsUrl = `ws://localhost:8080/connect-chatboat/${cxId}`;
        logger.info("Connecting to WebSocket:", wsUrl);

        // Here you could add the token to the URL, e.g., `${wsUrl}?token=${this.apiToken}`
        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
            logger.info("WebSocket connection established.");
        };

        this.ws.onmessage = async (event) => {
            const decryptedMessage = await this.decrypt(event.data);
            logger.info("WebSocket message received (decrypted):", decryptedMessage);
        };

        this.ws.onerror = (error) => {
            logger.error("WebSocket error:", error);
        };

        this.ws.onclose = () => {
            logger.info("WebSocket connection closed.");
        };

        return this.ws;
    }

    public async sendMessage(message: any) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            const encryptedMessage = await this.encrypt(message);
            this.ws.send(encryptedMessage);
            logger.info("WebSocket message sent (encrypted):", message);
        } else {
            logger.error("WebSocket is not connected.");
        }
    }

    public disconnect() {
        if (this.ws) {
            this.ws.close();
        }
    }
}

export const webSocketService = new WebSocketService(); 