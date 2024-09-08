import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./QuizModal.module.css";
import Lottie from "lottie-react";
import congratulationAnimation from "~assets/reward/congratulation.json";

export default function QuizModal({
    onClose,
    enterpriseName,
    amount,
    goVideo,
    goCompany,
}) {
    return (
        <div className={styles.modalOverlay}>
            <motion.div
                className={styles.modalContentAni}
                initial={{ y: "100vh", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100vh", opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                <div className={styles.modalContent}>
                    <div className={styles.animationWrapper}>
                        <Lottie
                            animationData={congratulationAnimation}
                            loop={true}
                            className={styles.congratulationAnimation}
                        />
                    </div>
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
                </div>
            </motion.div>
        </div>
    );
}
