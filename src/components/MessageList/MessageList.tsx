import React, { useEffect, useRef } from "react";
import MessageBubble from "../MessageBubble";
import styles from "./MessageList.module.scss";

export interface Message {
    id: number;
    sender: "user" | "bot";
    text: string;
    timestamp: Date;
}

interface MessageListProps {
    messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className={styles.messages}>
            {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
            ))}
            <div ref={endRef} />
        </div>
    );
};

export default MessageList; 