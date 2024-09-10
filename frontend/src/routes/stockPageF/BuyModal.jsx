import React from "react";
import styles from "./BuyModal.module.css";
import Character from "~assets/character.svg";

export default function BuyModal({ onClose, stockName, goLink }) {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <img src={Character} className={styles.character} />
                <div className={styles.modalTitle}>
                    {stockName}를(을) 구매하시려면 <br></br>신한투자증권에서
                    <br></br>구매해보세요!
                </div>
                <div className={styles.buttonGroup}>
                    <div onClick={onClose} className={styles.quizContainer}>
                        <div className={styles.quizButton}>닫기</div>
                    </div>
                    <div onClick={goLink} className={styles.replayContainer}>
                        <div className={styles.replayButton}>이동하기</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
