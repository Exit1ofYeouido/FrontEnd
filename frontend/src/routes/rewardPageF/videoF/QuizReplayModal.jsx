import React from "react";
import styles from "./QuizReplayModal.module.css";
import { MdOutlineReplay, MdOutlineQuiz } from "react-icons/md";

export default function QuizReplayModal({ onClose, onReplay, onQuiz }) {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>영상은 잘 확인하셨나요?</h2>
                <div onClick={onQuiz} className={styles.quizContainer}>
                    <MdOutlineQuiz className={styles.quizIcon} />
                    <div className={styles.quizButton}>퀴즈 풀기</div>
                </div>
                <div onClick={onReplay} className={styles.replayContainer}>
                    <MdOutlineReplay className={styles.replayIcon} />
                    <div className={styles.replayButton}>다시보기</div>
                </div>
            </div>
        </div>
    );
}
