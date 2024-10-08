import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./RewardPage.module.css";
import { IoIosArrowForward } from "react-icons/io";
import Navbar from "~components/Navbar";
import { getTutorialCheck } from "~apis/myAPI/myApi";

const calendarIcon =
    "https://stock-craft.s3.ap-northeast-2.amazonaws.com/homepage/calendar.png";
const receiptIcon =
    "https://stock-craft.s3.ap-northeast-2.amazonaws.com/homepage/receipt.svg";
const videoIcon =
    "https://stock-craft.s3.ap-northeast-2.amazonaws.com/homepage/video.svg";

const RewardItem = ({ icon, title, description, navigateTo, type }) => {
    const navigate = useNavigate();

    const handleNavigation = async () => {
        if (type === "출첵") {
            navigate(navigateTo);
            return;
        }

        const result = await getTutorialCheck(type);

        if (
            (navigateTo === "/reward/video" ||
                navigateTo === "/reward/receipt") &&
            !result.tutoChecked
        ) {
            navigate(`${navigateTo}tutorial`, { state: { from: "reward" } });
        } else {
            navigate(navigateTo);
        }
    };

    return (
        <motion.div
            className={styles.item}
            onClick={handleNavigation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <motion.div className={styles.iconWrapper}>
                <img src={icon} alt={title} className={styles.icon} />
            </motion.div>
            <motion.div className={styles.textWrapper}>
                <div className={styles.title}>{title}</div>
                <div className={styles.description}>{description}</div>
            </motion.div>
            <motion.div className={styles.arrowWrapper}>
                <IoIosArrowForward />
            </motion.div>
        </motion.div>
    );
};

export default function RewardPage() {
    return (
        <div>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className={styles.content}
                >
                    <div className={styles.totalTitle}>
                        <div>리워드</div>
                    </div>
                    <div>
                        <RewardItem
                            icon={calendarIcon}
                            title="출석 체크"
                            description="출석 체크 후 랜덤 주식을 받을 수 있어요!"
                            navigateTo="/reward/attendance"
                            type="출첵"
                        />
                        <RewardItem
                            icon={videoIcon}
                            title="기업 광고 시청"
                            description="기업 광고를 시청 후 주식을 받을 수 있어요!"
                            navigateTo="/reward/video"
                            type="광고"
                        />
                        <RewardItem
                            icon={receiptIcon}
                            title="영수증 인증"
                            description={
                                <>
                                    영수증 인증 후 <br></br>해당 기업의 주식을
                                    받을 수 있어요!
                                </>
                            }
                            navigateTo="/reward/receipt"
                            type="영수증"
                        />
                    </div>
                </motion.div>
            </div>
            <Navbar />
        </div>
    );
}
