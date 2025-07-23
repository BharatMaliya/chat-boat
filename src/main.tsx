import type { Root } from "react-dom/client";
import { type ChatbotWidgetProps } from "./components/ChatbotWidget";
import { getWidgetConfig } from "./core/config-loader";
import { renderWidget } from "./core/widget-renderer";
import "./styles/index.scss";

declare global {
  interface Window {
    MountChatBoatWidget: (
      customerId: string,
      element?: HTMLElement,
      options?: ChatbotWidgetProps,
    ) => Root;
  }
}

window.MountChatBoatWidget = (
  customerId: string,
  element?: HTMLElement,
  options?: ChatbotWidgetProps
) => {
  console.log("[ChatboatWidget] Mount initiated with:", { element, options });

  const config = getWidgetConfig();

  if (!config) {
    throw new Error("ChatboatWidget config not found");
  }

  const mergedOptions: ChatbotWidgetProps = {
    ...config,
    ...options,
    customerId,
  };

  const root = renderWidget(customerId, element, mergedOptions);

  console.log("[ChatboatWidget] Mount complete.");
  return root;
};

const attemptAutoMount = async () => {
  const config = await getWidgetConfig();
  console.log("[ChatboatWidget] Auto-mount check:", { config });
  if (config?.shouldAutoMount) {
    window.MountChatBoatWidget(config.cxId);
  }
};

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attemptAutoMount);
  } else {
    attemptAutoMount();
  }
}
