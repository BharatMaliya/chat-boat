import React from "react";
import ReactDOM from "react-dom/client";
import ChatbotWidget, { type ChatbotWidgetProps } from "./components/ChatbotWidget";
import "./styles/index.scss";

// TypeScript declarations for global functions
declare global {
  interface Window {
    ChatboatWidgetAutoMount: () => any;
    ChatboatWidgetMount: (element: HTMLElement, options?: ChatbotWidgetProps) => any;
  }
}

// Simple auto-mount function (Option 1)
window.ChatboatWidgetAutoMount = () => {
  console.log('[ChatboatWidget] Auto-mounting widget...');
  // Create default container if it doesn't exist
  let container = document.getElementById("chatboat-widget");
  if (!container) {
    container = document.createElement("div");
    container.id = "chatboat-widget";
    document.body.appendChild(container);
  }

  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <ChatbotWidget />
    </React.StrictMode>
  );
  console.log('[ChatboatWidget] Auto-mount complete.');
  return root;
};

// Advanced mount function with configuration (Option 2)
window.ChatboatWidgetMount = (
  element: HTMLElement,
  options?: ChatbotWidgetProps
) => {
  console.log('[ChatboatWidget] Advanced mount called with:', { element, options });
  const root = ReactDOM.createRoot(element);
  root.render(
    <React.StrictMode>
      <ChatbotWidget {...options} />
    </React.StrictMode>
  );
  console.log('[ChatboatWidget] Advanced mount complete.');
  return root;
};

// Auto-mount if script is loaded and no manual mount is called
if (typeof window !== "undefined") {
  // Wait a bit to see if manual mount is called
  setTimeout(() => {
    if (!document.getElementById("bharat-maliya")) {
      window.ChatboatWidgetAutoMount();
    }
  }, 100);
}
