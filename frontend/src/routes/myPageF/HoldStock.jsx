import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./HoldStock.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { getHoldStock, getStockHistory, myGetAll } from "~apis/myAPI/myApi";

export default function HoldStock() {
    const [totalValue, setTotalValue] = useState(0);
    const [earningRate, setEarningRate] = useState("0");
    const [stocks, setStocks] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [activeTab, setActiveTab] = useState("stocks");
    const [isFirstRender, setIsFirstRender] = useState(true);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/my");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const holdStockData = await getHoldStock();
                const stockHistoryData = await getStockHistory();
                const allData = await myGetAll();

                setTotalValue(allData.allCost);
                setEarningRate(allData.earningRate);
                setStocks(holdStockData);
                setTransactions(stockHistoryData);
                setIsFirstRender(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const calculateProfitOrLoss = (earningRate, allCost) => {
        const rate = parseFloat(earningRate);
        const profitOrLoss = (rate / 100) * allCost;
        return Math.round(profitOrLoss);
    };

    const handleTabChange = (tab) => {
        if (tab !== activeTab) {
            setActiveTab(tab);
        }
    };

    const variants = {
        enter: {
            x: activeTab === "stocks" ? -300 : 300,
            opacity: 0,
        },
        center: {
            x: 0,
            opacity: 1,
        },
        exit: {
            x: activeTab === "stocks" ? 300 : -300,
            opacity: 0,
        },
    };

    return (
        <motion.div
            key="hold-stock"
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
                    <div>
                        {calculateProfitOrLoss(earningRate, totalValue)}
                        원 ({earningRate}%)
                    </div>
                    <button className={styles.sellButton}>판매하기</button>
                </div>

                <div className={styles.stockContainer}>
                    <div className={styles.tabs}>
                        <div
                            className={`${styles.tabButton} ${
                                activeTab === "stocks" ? styles.activeTab : ""
                            }`}
                            onClick={() => handleTabChange("stocks")}
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
                            onClick={() => handleTabChange("transactions")}
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

                    <motion.div
                        key={activeTab}
                        className={styles.slide}
                        variants={variants}
                        initial={isFirstRender && activeTab === "stocks" ? false : "enter"}
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0 },
                        }}
                    >
                        {activeTab === "stocks" ? (
                            stocks.length > 0 ? (
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
                                            <div
                                                className={styles.stockName}
                                            >
                                                {stock.name}
                                            </div>
                                            <div
                                                className={
                                                    styles.stockQuantity
                                                }
                                            >
                                                {stock.quantity} 주
                                            </div>
                                            <div
                                                className={styles.stockValue}
                                            >
                                                {stock.value}원 (0.00%)
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.noData}>
                                    보유 주식이 없습니다.
                                </div>
                            )
                        ) : activeTab === "transactions" ? (
                            transactions.length > 0 ? (
                                <div className={styles.transactionsList}>
                                    {transactions.map((transaction) => (
                                        <div
                                            key={transaction.id}
                                            className={styles.transaction}
                                        >
                                            <div
                                                className={
                                                    styles.transactionDate
                                                }
                                            >
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
                                                        transaction.type ===
                                                        "매수"
                                                            ? styles.redText
                                                            : styles.blueText
                                                    }`}
                                                >
                                                    {transaction.type ===
                                                    "매수"
                                                        ? "+"
                                                        : "-"}
                                                    {transaction.quantity} 주
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.noData}>
                                    거래 내역이 없습니다.
                                </div>
                            )
                        ) : null}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
