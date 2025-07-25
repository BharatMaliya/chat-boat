import React, { useEffect, useState } from "react";
import { webSocketService } from "../../services/websocket";
import { logger } from "../../utils/logger";
import MessageInput from "../MessageInput";
import MessageList, { type Message } from "../MessageList";
import styles from "./ChatbotWidget.module.scss";
import BoatAvatar from "../BoatAvatar/BoatAvatar.tsx";

export interface ChatbotWidgetProps {
    theme?: {
        primaryColor?: string;
        headerGradient?: string;
        backgroundColor?: string;
    };
    initialMessages?: Message[];
    userName?: string;
    customerId: string;
    onOpen?: () => void;
    onClose?: () => void;
    onSend?: (message: Message) => void;
}

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
    theme,
    initialMessages,
    userName,
    customerId,
    onOpen,
    onClose,
    onSend,
}) => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(
        initialMessages && initialMessages.length > 0
            ? initialMessages
            : [
                {
                    id: 1,
                    sender: "bot",
                    text: userName
                        ? `Hello ${userName}! How can I help you today?`
                        : "Hello! How can I help you today?",
                    timestamp: new Date(),
                },
            ]
    );

    // Log the host domain and connect to WebSocket when the widget mounts
    useEffect(() => {
        const domain = window.location.hostname;
        logger.info("Loaded on domain:", domain);
        if (customerId) {
            logger.info("Received Customer ID:", customerId);
            webSocketService.connect(customerId);
            // Clean up the connection when the component unmounts
            return () => {
                webSocketService.disconnect();
            };
        }
        // Optionally, send this to your backend here
    }, [customerId]);

    useEffect(() => {
        if (open && onOpen) onOpen();
        if (!open && onClose) onClose();
        // eslint-disable-next-line
    }, [open]);

    const handleSend = (text: string) => {
        const userMsg: Message = {
            id: messages.length + 1,
            sender: "user",
            text,
            timestamp: new Date(),
        };
        setMessages([...messages, userMsg]);
        if (onSend) onSend(userMsg);
        webSocketService.sendMessage({ text });
        // Simulate bot reply
        setTimeout(() => {
            setMessages((msgs) => [
                ...msgs,
                {
                    id: msgs.length + 1,
                    sender: "bot",
                    text: "I'm a bot!",
                    timestamp: new Date(),
                },
            ]);
        }, 800);
    };

    // Inline style for theme support
    const widgetStyle: React.CSSProperties = {
        ...(theme?.backgroundColor && { background: theme.backgroundColor }),
    };
    const headerStyle: React.CSSProperties = {
        ...(theme?.headerGradient && { background: theme.headerGradient }),
        ...(theme?.primaryColor && { color: theme.primaryColor }),
    };

    return (
        <>
            {!open && (
                <button
                    className={styles.fab}
                    aria-label="Open chat"
                    onClick={() => setOpen(true)}
                    style={theme?.primaryColor ? { background: theme.primaryColor } : {}}
                >
                    <BoatAvatar size={60} />
                </button>
            )}
            {open && (
                <div className={`${styles.widget} ${styles.popout}`} style={widgetStyle}>
                    <div className={styles.header} style={headerStyle}>
                        <div className={styles.headerBranding}>
                            <span>Tripkliq</span>
                        </div>
                        <button
                            className={styles.closeBtn}
                            aria-label="Close chat"
                            onClick={() => setOpen(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </button>
                    </div>
                    <MessageList messages={messages} />
                    <MessageInput onSend={handleSend} />
                </div>
            )}
        </>
    );
};

export default ChatbotWidget; 