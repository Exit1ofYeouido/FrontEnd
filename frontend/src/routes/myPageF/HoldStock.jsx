import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./HoldStock.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function HoldStock() {
    const dummyStocks = [
        {
            id: 1,
            name: "아디다스",
            logo: "https://via.placeholder.com/50",
            quantity: 0.025,
            value: 1500,
        },
        {
            id: 2,
            name: "삼성",
            logo: "https://via.placeholder.com/50",
            quantity: 0.025,
            value: 5000,
        },
    ];

    const dummyTransactions = [
        {
            id: 1,
            date: "2024.08.20. 08:09 AM",
            stockName: "이엠텍",
            type: "매수",
            quantity: 0.0025,
        },
        {
            id: 2,
            date: "2024.08.20. 08:09 AM",
            stockName: "이엠텍",
            type: "매도",
            quantity: 0.0025,
        },
        {
            id: 3,
            date: "2024.08.20. 08:09 AM",
            stockName: "이엠텍",
            type: "매도",
            quantity: 0.0025,
        },
    ];

    const [totalValue, setTotalValue] = useState(0);
    const [stocks, setStocks] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [activeTab, setActiveTab] = useState("stocks");
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/my");
    };

    useEffect(() => {
        const totalStockValue = dummyStocks.reduce(
            (acc, stock) => acc + stock.value,
            0
        );
        setTotalValue(totalStockValue);
        setStocks(dummyStocks);
        setTransactions(dummyTransactions);
    }, []);

    return (
        <motion.div
            key="signin-form"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <div className={styles.container}>
                <div className={styles.topBar}>
                    <div className={styles.arrow} onClick={handleBack}>
                        <IoIosArrowBack />
                    </div>
                    <div>내 보유 주식</div>
                </div>

                <div className={styles.totalStock}>
                    <div>내 주식</div>
                    <div>{totalValue}원</div>
                    <div>0원 (0.00%)</div>
                    <button className={styles.sellButton}>판매하기</button>
                </div>

                <div className={styles.stockContainer}>
                    <div className={styles.tabs}>
                        <div
                            className={`${styles.tabButton} ${
                                activeTab === "stocks" ? styles.activeTab : ""
                            }`}
                            onClick={() => setActiveTab("stocks")}
                        >
                            보유 주식
                            {activeTab === "stocks" && (
                                <motion.div
                                    className={styles.underline}
                                    layoutId="underline"
                                />
                            )}
                        </div>
                        <div
                            className={`${styles.tabButton} ${
                                activeTab === "transactions"
                                    ? styles.activeTab
                                    : ""
                            }`}
                            onClick={() => setActiveTab("transactions")}
                        >
                            거래 내역
                            {activeTab === "transactions" && (
                                <motion.div
                                    className={styles.underline}
                                    layoutId="underline"
                                />
                            )}
                        </div>
                    </div>

                    <div className={styles.totalCount}>
                        총{" "}
                        {activeTab === "stocks"
                            ? stocks.length
                            : transactions.length}{" "}
                        건
                    </div>
                    {activeTab === "stocks" && (
                        <div className={styles.stocksList}>
                            {stocks.map((stock) => (
                                <div
                                    key={stock.id}
                                    className={styles.stockCard}
                                >
                                    <img
                                        src={stock.logo}
                                        alt={`${stock.name} 로고`}
                                        className={styles.stockLogo}
                                    />
                                    <div className={styles.stockName}>
                                        {stock.name}
                                    </div>
                                    <div className={styles.stockQuantity}>
                                        {stock.quantity} 주
                                    </div>
                                    <div className={styles.stockValue}>
                                        (0.00)%
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === "transactions" && (
                        <div className={styles.transactionsList}>
                            {transactions.map((transaction) => (
                                <div
                                    key={transaction.id}
                                    className={styles.transaction}
                                >
                                    <div className={styles.transactionDate}>
                                        {transaction.date}
                                    </div>
                                    <div className={styles.detail}>
                                        <div
                                            className={
                                                styles.transactionStockName
                                            }
                                        >
                                            {transaction.stockName}{" "}
                                            {transaction.type === "매수"
                                                ? "획득"
                                                : "판매"}
                                        </div>
                                        <div
                                            className={`${
                                                styles.transactionQuantity
                                            } ${
                                                transaction.type === "매수"
                                                    ? styles.redText
                                                    : styles.blueText
                                            }`}
                                        >
                                            {transaction.type === "매수"
                                                ? "+"
                                                : "-"}
                                            {transaction.quantity} 주
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
