import React, { useState, useEffect } from "react";
import styles from "./Asset.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getHome } from "~apis/homeAPI/homeApi";

export default function Asset() {
    const navigate = useNavigate();
    const [point, setPoint] = useState(0);
    const [stock, setStock] = useState(0);
    const [asset, setAsset] = useState(0);
    const [earningRate, setEarningRate] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHome();
                setPoint(data.totalPoint);
                setStock(data.totalStock);
                setAsset(data.totalAssets);
                setEarningRate(data.totalEarningRate);
            } catch (error) {
                console.error(
                    "데이터를 가져오는 동안 오류가 발생했습니다:",
                    error
                );
            }
        };

        fetchData();
    }, []);

    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    };

    const calculateProfitOrLoss = (earningRate, allCost) => {
        const rate = parseFloat(earningRate);
        const originalCost = allCost / (1 + rate / 100);
        const profitOrLoss = allCost - originalCost;
        return Math.round(profitOrLoss);
    };

    const profitOrLoss = calculateProfitOrLoss(earningRate, stock);

    return (
        <div className={styles.info}>
            <div className={styles.title}>내 자산</div>
            <div className={styles.details}>
                <div className={styles.amount}>{formatNumber(asset)}원</div>
                <motion.div
                    className={styles.more}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate("/my")}
                >
                    더보기
                </motion.div>
            </div>
            <div
                className={styles.earningRate}
                style={{ color: profitOrLoss < 0 ? "#ff0000" : "#007bff" }}
            >
                {profitOrLoss}원 ({earningRate}%)
            </div>
            <div className={styles.line}></div>
            <div className={styles.subInfo}>
                <div className={styles.stock}>
                    <div className={styles.stockTitle}>내 주식</div>
                    <div className={styles.stockAmount}>
                        {formatNumber(stock)} 원
                    </div>
                </div>
                <div className={styles.point}>
                    <div className={styles.pointTitle}>내 포인트</div>
                    <div className={styles.pointAmount}>
                        {formatNumber(point)} 점
                    </div>
                </div>
            </div>
        </div>
    );
}
