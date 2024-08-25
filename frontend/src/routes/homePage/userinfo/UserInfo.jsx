import React from "react";
import { motion } from "framer-motion";
import styles from "./UserInfo.module.css";
import { useNavigate } from "react-router-dom";

export default function UserInfo() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.name}>양진혁 님</div>
            <div className={styles.separator}></div>
            <div className={styles.actions}>
                <motion.div
                    className={styles.actionItem}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate("/reward/attendance")}
                >
                    <div
                        className={`${styles.icon} ${styles.calendarIcon}`}
                    ></div>
                    <div className={styles.actionLabel}>출석체크</div>
                </motion.div>
                <motion.div
                    className={styles.actionItem}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate("/my/point")}
                >
                    <div className={`${styles.icon} ${styles.pointIcon}`}></div>
                    <div className={styles.actionLabel}>포인트 내역</div>
                </motion.div>
                <motion.div
                    className={styles.actionItem}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    // onClick={() => navigate("/페이지 만들기")}
                >
                    <div className={`${styles.icon} ${styles.useIcon}`}></div>
                    <div className={styles.actionLabel}>이용방법</div>
                </motion.div>
                <motion.div
                    className={styles.actionItem}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate("/my/faq")}
                >
                    <div className={`${styles.icon} ${styles.faqIcon}`}></div>
                    <div className={styles.actionLabel}>FAQ</div>
                </motion.div>
            </div>
        </div>
    );
}
