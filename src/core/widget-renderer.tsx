import React from "react";
import ReactDOM from "react-dom/client";
import { KEYS } from "../common/keys";
import ChatbotWidget, {
    type ChatbotWidgetProps,
} from "../components/ChatbotWidget";

export const renderWidget = (
    customerId: string,
    element?: HTMLElement,
    options?: ChatbotWidgetProps
) => {
    console.log('[ChatboatWidget] Rendering widget with options:', options);
    let container = element;
    if (!container) {
        let existingContainer = document.getElementById(
            KEYS.CHAT_BOAT_MOUNTING_ELEMENT
        );
        if (existingContainer) {
            container = existingContainer;
        } else {
            console.log('[ChatboatWidget] Creating new container element.');
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
    console.log('[ChatboatWidget] Widget rendered.');
    return root;
};
