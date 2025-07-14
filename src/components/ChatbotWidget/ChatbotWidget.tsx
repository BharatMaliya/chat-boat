import React, { useEffect, useState } from "react";
import MessageInput from "../MessageInput";
import MessageList, { type Message } from "../MessageList";
import styles from "./ChatbotWidget.module.scss";

export interface ChatbotWidgetProps {
    theme?: {
        primaryColor?: string;
        headerGradient?: string;
        backgroundColor?: string;
    };
    initialMessages?: Message[];
    userName?: string;
    onOpen?: () => void;
    onClose?: () => void;
    onSend?: (message: Message) => void;
}

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
    theme,
    initialMessages,
    userName,
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

    // Log the host domain when the widget mounts
    useEffect(() => {
        const domain = window.location.hostname;
        console.log('[ChatboatWidget] Loaded on domain:', domain);
        // Optionally, send this to your backend here
    }, []);

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
            {/* Floating Chat Icon Button */}
            {!open && (
                <button
                    id="bharat-maliya"
                    className={styles.fab}
                    aria-label="Open chat"
                    onClick={() => setOpen(true)}
                    style={theme?.primaryColor ? { background: theme.primaryColor } : {}}
                >
                    <span role="img" aria-label="robot">🤖</span>
                </button>
            )}
            {/* Chatbot Popout */}
            {open && (
                <div id="bharat-maliya" className={`${styles.widget} ${styles.popout}`} style={widgetStyle}>
                    <div className={styles.header} style={headerStyle}>
                        <span role="img" aria-label="robot">🤖</span> Chatbot
                        <button
                            className={styles.closeBtn}
                            aria-label="Close chat"
                            onClick={() => setOpen(false)}
                        >
                            ×
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