import React from "react";
import styles from "./Avatar.module.scss";

const Avatar: React.FC<{ user?: boolean }> = ({ user }) => {
    return (
        <div className={`${styles.avatar} ${user ? styles.user : styles.bot}`}>
            {user ? (
                <span role="img" aria-label="user">🧑</span>
            ) : (
                <span role="img" aria-label="bot">🤖</span>
            )}
        </div>
    );
};

export default Avatar; 