import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./HoldPoint.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function HoldPoint() {
    const dummyTransactions = [
        {
            id: 1,
            date: "2024.08.20. 08:09 AM",
            stockName: "포인트",
            type: "획득",
            quantity: 3000,
        },
        {
            id: 2,
            date: "2024.08.20. 08:09 AM",
            stockName: "포인트",
            type: "출금",
            quantity: 2000,
        },
        {
            id: 3,
            date: "2024.08.20. 08:09 AM",
            stockName: "포인트",
            type: "획득",
            quantity: 3000,
        },
    ];

    const [totalValue, setTotalValue] = useState(200); // Total points shown in the image
    const [transactions, setTransactions] = useState([]);
    const [activeTab, setActiveTab] = useState("transactions");
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/my");
    };

    useEffect(() => {
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
                    <div>포인트 내역</div>
                </div>

                <div className={styles.totalPoint}>
                    <div>내 포인트</div>
                    <div>{totalValue}원</div>
                    <button className={styles.sellButton}>출금하기</button>
                </div>

                <div className={styles.stockContainer}>
                    <div className={styles.tabs}>
                        <div
                            className={`${styles.tabButton} ${
                                activeTab === "transactions"
                                    ? styles.activeTab
                                    : ""
                            }`}
                            onClick={() => setActiveTab("transactions")}
                        >
                            포인트 내역
                            {activeTab === "transactions" && (
                                <motion.div
                                    className={styles.underline}
                                    layoutId="underline"
                                />
                            )}
                        </div>
                    </div>

                    <div className={styles.totalCount}>
                        총 {transactions.length} 건
                    </div>

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
                                            {transaction.type}
                                        </div>
                                        <div
                                            className={`${
                                                styles.transactionQuantity
                                            } ${
                                                transaction.type === "획득"
                                                    ? styles.redText
                                                    : styles.blueText
                                            }`}
                                        >
                                            {transaction.type === "획득"
                                                ? "+"
                                                : "-"}
                                            {transaction.quantity} 원
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
