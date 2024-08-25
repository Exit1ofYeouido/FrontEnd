import React from "react";
import styles from "./Asset.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Asset() {
    const navigate = useNavigate();

    return (
        <div className={styles.info}>
            <div className={styles.title}>내 자산</div>
            <div className={styles.details}>
                <div className={styles.amount}>200,000원</div>
                <motion.div
                    className={styles.more}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate("/my")}
                >
                    더보기
                </motion.div>
            </div>
            <div className={styles.earningRate}>0원 (0.00%)</div>
            <div className={styles.line}></div>
            <div className={styles.subInfo}>
                <div className={styles.stock}>
                    <div className={styles.stockTitle}>내 주식</div>
                    <div className={styles.stockAmount}>10,000원</div>
                </div>
                <div className={styles.point}>
                    <div className={styles.pointTitle}>내 포인트</div>
                    <div className={styles.pointAmount}>10,000점</div>
                </div>
            </div>
        </div>
    );
}
