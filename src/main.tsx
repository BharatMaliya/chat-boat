import type { Root } from "react-dom/client";
import { type ChatbotWidgetProps } from "./components/ChatbotWidget";
import { getWidgetConfig } from "./core/config-loader";
import { renderWidget } from "./core/widget-renderer";
import "./styles/index.scss";
import { logger } from "./utils/logger";

declare global {
  interface Window {
    MountChatBoatWidget: (
      customerId: string,
      element?: HTMLElement,
      options?: ChatbotWidgetProps,
    ) => Promise<Root>;
  }
}

window.MountChatBoatWidget = async (
  customerId: string,
  element?: HTMLElement,
  options?: ChatbotWidgetProps
) => {
  logger.info("Mount initiated with:", { customerId, element, options });

  const config = await getWidgetConfig();

  if (!config) {
    throw new Error("ChatboatWidget config not found");
  }

  const mergedOptions: ChatbotWidgetProps = {
    ...config,
    ...options,
    customerId,
  };

  const root = renderWidget(customerId, element, mergedOptions);

  logger.info("Mount complete.");
  return root;
};

const attemptAutoMount = async () => {
  const config = await getWidgetConfig();
  logger.info("Auto-mount check:", { config });
  if (config?.shouldAutoMount && config.cxId) {
    await window.MountChatBoatWidget(config.cxId);
  }
};

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attemptAutoMount);
  } else {
    attemptAutoMount();
  }
}
