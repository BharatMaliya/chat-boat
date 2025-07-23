import type { Root } from "react-dom/client";
import { type ChatbotWidgetProps } from "./components/ChatbotWidget";
import { getWidgetConfig } from "./core/config-loader";
import { renderWidget } from "./core/widget-renderer";
import "./styles/index.scss";

declare global {
  interface Window {
    MountChatBoatWidget: (
      element?: HTMLElement,
      options?: ChatbotWidgetProps
    ) => Root;
  }
}

window.MountChatBoatWidget = (
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
  };

  const root = renderWidget(element, mergedOptions);

  console.log("[ChatboatWidget] Mount complete.");
  return root;
};

const attemptAutoMount = () => {
  const config = getWidgetConfig();
  console.log("[ChatboatWidget] Auto-mount check:", { config });
  if (config?.shouldAutoMount) {
    window.MountChatBoatWidget();
  }
};

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attemptAutoMount);
  } else {
    attemptAutoMount();
  }
}
