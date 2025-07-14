import React from "react";
import Avatar from "../Avatar";
import type { Message } from "../MessageList";
import styles from "./MessageBubble.module.scss";

interface MessageBubbleProps {
    message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const isUser = message.sender === "user";
    return (
        <div className={`${styles.bubbleRow} ${isUser ? styles.user : styles.bot}`}>
            {!isUser && <Avatar />}
            <div className={`${styles.bubble} ${isUser ? styles.user : styles.bot}`}>
                <span>{message.text}</span>
                <div className={styles.timestamp}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
            </div>
            {isUser && <Avatar user />}
        </div>
    );
};

export default MessageBubble; 