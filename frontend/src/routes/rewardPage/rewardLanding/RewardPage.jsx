import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./RewardPage.module.css";
import calendarIcon from "~assets/homepage/calendar.svg";
import receiptIcon from "~assets/homepage/receipt.svg";
import videoIcon from "~assets/homepage/video.svg";
import { IoIosArrowForward } from "react-icons/io";

const RewardItem = ({ icon, title, description, navigateTo }) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(navigateTo);
    };

    return (
        <div className={styles.item} onClick={handleNavigation}>
            <motion.div
                className={styles.iconWrapper}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
            >
                <img src={icon} alt={title} className={styles.icon} />
            </motion.div>
            <div className={styles.textWrapper}>
                <div className={styles.title}>{title}</div>
                <div className={styles.description}>{description}</div>
            </div>
            <div className={styles.arrowWrapper}>
                <IoIosArrowForward />
            </div>
        </div>
    );
};

export default function RewardPage() {
    return (
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
                        description="출석을 통해 랜덤 주식을 받을 수 있어요!"
                        navigateTo="/reward/attendance"
                    />
                    <RewardItem
                        icon={videoIcon}
                        title="기업 광고 시청"
                        description="내가 원하는 기업 광고를 재미있게 시청하고 주식 받자!"
                        navigateTo="/reward/video"
                    />
                    <RewardItem
                        icon={receiptIcon}
                        title="영수증 인증"
                        description={
                            <>
                                좋아하는 물품을 사고나서 <br />
                                해당 기업의 주식을 받을 수 있어요!
                            </>
                        }
                        navigateTo="/reward/receipt"
                    />
                </div>
            </motion.div>
        </div>
    );
}
