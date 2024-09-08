import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./UseWay.module.css";
import { IoIosArrowForward } from "react-icons/io";
import Navbar from "~components/Navbar";
import { IoIosArrowBack } from "react-icons/io";

const receiptIcon =
    "https://stock-craft.s3.ap-northeast-2.amazonaws.com/homepage/receipt.svg";
const videoIcon =
    "https://stock-craft.s3.ap-northeast-2.amazonaws.com/homepage/video.svg";

const RewardItem = ({ icon, title, description, navigateTo }) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(navigateTo, { state: { from: "home/useway" } });
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

export default function UseWay() {
    const navigate = useNavigate();

    const handlePrevious = () => {
        navigate("/home");
    };
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
                    <div className={styles.topBar}>
                        <IoIosArrowBack
                            className={styles.backIcon}
                            onClick={handlePrevious}
                        />
                        <div className={styles.totalTitle}>
                            <div>이용 방법</div>
                        </div>
                    </div>

                    <div>
                        <RewardItem
                            icon={videoIcon}
                            title="기업 광고 시청"
                            description="내가 원하는 기업 광고를 재미있게 시청하고 주식 받자!"
                            navigateTo="/reward/videotutorial"
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
                            navigateTo="/reward/receipttutorial"
                        />
                    </div>
                </motion.div>
            </div>
            <Navbar />
        </div>
    );
}
