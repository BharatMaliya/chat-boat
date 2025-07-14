import React, { useState } from "react";
import styles from "./MessageInput.module.scss";

interface MessageInputProps {
    onSend: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
    const [text, setText] = useState("");

    const handleSend = () => {
        if (text.trim()) {
            onSend(text);
            setText("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSend();
    };

    return (
        <div className={styles.inputRow}>
            <button className={styles.emojiBtn} title="Emoji" disabled>
                😊
            </button>
            <input
                className={styles.input}
                type="text"
                placeholder="Type your message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button className={styles.sendBtn} onClick={handleSend} disabled={!text.trim()}>
                ➤
            </button>
        </div>
    );
};

export default MessageInput; 