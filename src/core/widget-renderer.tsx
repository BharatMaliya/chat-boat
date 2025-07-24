import React from "react";
import ReactDOM from "react-dom/client";
import { KEYS } from "../common/keys";
import ChatbotWidget, {
    type ChatbotWidgetProps,
} from "../components/ChatbotWidget";
import { logger } from "../utils/logger";

export const renderWidget = (
    customerId: string,
    element?: HTMLElement,
    options?: ChatbotWidgetProps
) => {
    logger.debug("Rendering widget with options:", options);
    let container = element;
    if (!container) {
        let existingContainer = document.getElementById(
            KEYS.CHAT_BOAT_MOUNTING_ELEMENT
        );
        if (existingContainer) {
            container = existingContainer;
        } else {
            logger.debug("Creating new container element.");
            container = document.createElement("div");
            container.id = KEYS.CHAT_BOAT_MOUNTING_ELEMENT;
            document.body.appendChild(container);
        }
    }

    const root = ReactDOM.createRoot(container);
    root.render(
        <React.StrictMode>
            <ChatbotWidget customerId={customerId} {...options} />
        </React.StrictMode>
    );
    logger.info("Widget rendered.");
    return root;
};
