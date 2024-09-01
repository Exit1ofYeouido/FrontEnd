import React, { useEffect, useState } from "react";
import styles from "./MyPage.module.css";
import { motion } from "framer-motion";
import accountLogo from "~assets/my/accountLogo.svg";
import pointLogo from "~assets/my/point.svg";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { myGetAll } from "~apis/myAPI/myApi";

export default function MyPage() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await myGetAll();
                setData(data);
            } catch (error) {
                console.error(
                    "데이터를 가져오는 동안 오류가 발생했습니다:",
                    error
                );
            }
        };

        fetchData();
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    const calculateProfitOrLoss = (earningRate, allCost) => {
        const rate = parseFloat(earningRate);
        const profitOrLoss = (rate / 100) * allCost;
        return Math.round(profitOrLoss);
    };

    return (
        <motion.div
            key="signin-form"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <div className={styles.container}>
                <div className={styles.title}>마이페이지</div>

                {/* 포인트부분이랑께 */}
                <div className={styles.info}>
                    <div className={styles.top}>
                        <div className={styles.logoAccount}>
                            <img
                                src={accountLogo}
                                alt="Account Logo"
                                className={styles.accountLogo}
                            />
                            <div className={styles.accountId}>
                                {data.accountId}
                            </div>
                        </div>
                        <IoIosArrowForward className={styles.arrowWrapper} />
                    </div>
                    <div className={styles.pointAsset}>
                        <img
                            src={pointLogo}
                            alt="point Logo"
                            className={styles.pointLogo}
                        />
                        <div className={styles.pointText}>
                            {data.totalPoint}점
                        </div>
                    </div>
                    <div className={styles.bottom}>
                        <button className={styles.withdrawButton}>
                            출금하기
                        </button>
                    </div>
                </div>

                {/* 주식 부분이랑께 */}
                <div className={styles.stock}>
                    <div className={styles.stockTop}>
                        <div className={styles.myStockText}>내 주식</div>
                        <div className={styles.rate}>
                            <div className={styles.rate1}>{data.allCost}원</div>
                            <div className={styles.rate2}>
                                <span className={styles.won}>
                                    {calculateProfitOrLoss(
                                        data.earningRate,
                                        data.allCost
                                    )}
                                    원
                                </span>
                                <span className={styles.percent}>
                                    ({data.earningRate}%)
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.earningRatesList}>
                        {data.earningRates.map((rate, index) => (
                            <div key={index} className={styles.earningRateItem}>
                                <img
                                    src={`https://stock-craft.s3.ap-northeast-2.amazonaws.com/logos/${encodeURIComponent(
                                        rate.enterpriseName
                                    )}.svg`}
                                    alt={`${rate.enterpriseName} logo`}
                                    className={styles.logo}
                                />
                                <div className={styles.enterpriseName}>
                                    {rate.enterpriseName}
                                </div>
                                <div className={styles.rateValue}>
                                    ({rate.earningRate}%)
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.bottom}>
                        <button className={styles.moreButton}>더보기</button>
                    </div>
                </div>

                {/* 주식 부분이랑께 */}
                <div className={styles.etc}>
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
                            <div
                                className={`${styles.icon} ${styles.pointIcon}`}
                            ></div>
                            <div className={styles.actionLabel}>
                                포인트 내역
                            </div>
                        </motion.div>
                        <motion.div
                            className={styles.actionItem}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => navigate("/home/useway")}
                        >
                            <div
                                className={`${styles.icon} ${styles.useIcon}`}
                            ></div>
                            <div className={styles.actionLabel}>이용방법</div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
