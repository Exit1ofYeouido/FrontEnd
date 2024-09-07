import React from "react";
import { motion } from "framer-motion";
import styles from "./Reward.module.css";
import { useNavigate } from "react-router-dom";
import { getTutorialCheck } from "~apis/myAPI/myApi";

export default function Reward() {
    const navigate = useNavigate();

    const handleVideoClick = async () => {
        const result = await getTutorialCheck("광고");

        if (!result.tutoChecked) {
            navigate("/reward/videotutorial", { state: { from: "home" } });
        } else {
            navigate("/reward/video", { state: { from: "home" } });
        }
    };

    const handleReceiptClick = async () => {
        const result = await getTutorialCheck("영수증");

        if (!result.tutoChecked) {
            navigate("/reward/receipttutorial", { state: { from: "home" } });
        } else {
            navigate("/reward/receipt", { state: { from: "home" } });
        }
    };

    return (
        <div className={styles.section}>
            <div className={styles.title}>리워드</div>

            <div className={styles.item} onClick={handleVideoClick}>
                <motion.div
                    className={`${styles.icon} ${styles.videoIcon}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                ></motion.div>
                <div className={styles.text}>
                    <div className={styles.itemTitle}>기업 영상 시청</div>
                    <div className={styles.description}>
                        내가 원하는 기업 광고를 재미있게 시청하고 주식 받자!
                    </div>
                </div>
            </div>

            <div className={styles.item} onClick={handleReceiptClick}>
                <motion.div
                    className={`${styles.icon} ${styles.receiptIcon}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                ></motion.div>
                <div className={styles.text}>
                    <div className={styles.itemTitle}>영수증 인증</div>
                    <div className={styles.description}>
                        좋아하는 물품을 사고나서 <br></br>해당 기업의 주식을
                        받을 수 있어요!
                    </div>
                </div>
            </div>
        </div>
    );
}
