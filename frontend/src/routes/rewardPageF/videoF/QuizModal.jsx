import React from "react";
import styles from "./QuizModal.module.css";

export default function QuizModal({ onClose, enterpriseName, amount }) {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>축하합니다!</h2>
                <p>
                    {enterpriseName}에서 {amount} 주를 받았습니다.
                </p>
                <button onClick={onClose}>확인</button>
            </div>
        </div>
    );
}
