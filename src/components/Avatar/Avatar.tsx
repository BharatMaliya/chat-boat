import React from "react";
import styles from "./Avatar.module.scss";

const Avatar: React.FC<{ user?: boolean }> = ({ user }) => {
    return (
        <div className={`${styles.avatar} ${user ? styles.user : styles.bot}`}>
            {user ? (
                <span role="img" aria-label="user">🧑</span>
            ) : (
                <img src="https://chatbot.design/images/chatbot/DIGITAL%20%28RGB%29/SVG/Mark_RGB_Blue.svg" alt="Chatboat logo" />
            )}
        </div>
    );
};

export default Avatar; 