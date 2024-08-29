import React, { useEffect } from "react";

import styles from "./QuizModal.module.css";

export default function QuizModal({
    onClose,
    enterpriseName,
    amount,
    isCorrect,
    goVideo,
    goCompany,
}) {
    useEffect(() => {
        if (!isCorrect) {
            const timer = setTimeout(() => {
                onClose();
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [isCorrect, onClose]);
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {isCorrect ? (
                    <div className={styles.correctMessage}>
                        <div className={styles.correctText}>정답이에요!</div>
                        <div className={styles.company}>
                            <img
                                src={`https://stock-craft.s3.ap-northeast-2.amazonaws.com/logos/${encodeURIComponent(
                                    enterpriseName
                                )}.svg`}
                                alt={`${enterpriseName} logo`}
                                className={styles.logo}
                            />
                            <div className={styles.companyName}>
                                {enterpriseName}
                            </div>
                        </div>
                        <div className={styles.stockText}>
                            <div className={styles.stockAmount}>{amount}</div>
                            주가 도착했어요!
                        </div>
                        <div className={styles.buttonContainer}>
                            <button
                                onClick={goCompany}
                                className={styles.goCompany}
                            >
                                기업 보기
                            </button>
                            <button
                                onClick={goVideo}
                                className={styles.confirm}
                            >
                                확인
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={styles.wrongMessage}>
                            <div>틀렸습니다!</div>
                            <div>다시 풀어보세요.</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
