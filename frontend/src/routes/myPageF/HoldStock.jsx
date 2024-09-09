import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import styles from "./HoldStock.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CancelModal from "./CancelModal";
import { showToast } from "~components/Toast";
import {
    getHoldStock,
    getStockHistory,
    getStockPendingHistory,
    cancelStockPending,
} from "~apis/myAPI/myApi";

export default function HoldStock() {
    const [totalValue, setTotalValue] = useState(0);
    const [earningRate, setEarningRate] = useState("0");
    const [stocks, setStocks] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [activeTab, setActiveTab] = useState("stocks");
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [unsettledTransactions, setUnsettledTransactions] = useState([]);
    const [size, setSize] = useState(0);
    const [transactionPage, setTransactionPage] = useState(0);
    const [hasMoreTransactions, setHasMoreTransactions] = useState(true);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedSaleId, setSelectedSaleId] = useState(null);

    const observer = useRef();

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/my");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const holdStockData = await getHoldStock();
                setTotalValue(holdStockData.stocksValueResponseDto.stocksValue);
                setEarningRate(
                    holdStockData.stocksValueResponseDto.earningRate
                );
                setStocks(holdStockData.myStocksResponse);
                console.log(holdStockData);
                setIsFirstRender(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const loadMoreTransactions = async (page) => {
        try {
            const stockHistoryData = await getStockHistory(page);
            const { size, stocksHistory } = stockHistoryData;

            setTransactions((prevTransactions) => [
                ...prevTransactions,
                ...stocksHistory,
            ]);
            setSize(size);
            setHasMoreTransactions(stocksHistory.length === 6);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    const handleCancelUnsettled = (saleId) => {
        setSelectedSaleId(saleId);
        setShowCancelModal(true);
    };

    const confirmCancel = async (saleId) => {
        try {
            await cancelStockPending(saleId);
            showToast("success", "주문이 취소되었습니다.");
            const unsettledData = await getStockPendingHistory();
            setUnsettledTransactions(
                unsettledData.myStockSaleRequestResponseDtos
            );
            setShowCancelModal(false);
        } catch (error) {
            console.error("Error cancelling the order:", error);
            showToast("error", "취소에 실패했습니다.");
        }
    };

    useEffect(() => {
        if (activeTab === "transactions") {
            loadMoreTransactions(transactionPage);
        }
    }, [transactionPage, activeTab]);

    const lastTransactionElementRef = useCallback(
        (node) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMoreTransactions) {
                    console.log("Increasing page from:", prevPage);
                    setTransactionPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [hasMoreTransactions]
    );

    const handleTabChange = async (tab) => {
        if (tab !== activeTab) {
            setActiveTab(tab);
            try {
                if (tab === "stocks") {
                    const holdStockData = await getHoldStock();
                    setTotalValue(
                        holdStockData.stocksValueResponseDto.stocksValue
                    );
                    setEarningRate(
                        holdStockData.stocksValueResponseDto.earningRate
                    );
                    setStocks(holdStockData.myStocksResponse);
                } else if (tab === "transactions") {
                    setTransactionPage(0);
                    setTransactions([]);
                } else if (tab === "unsettled") {
                    const unsettledData = await getStockPendingHistory();
                    setUnsettledTransactions(
                        unsettledData.myStockSaleRequestResponseDtos
                    );
                }
            } catch (error) {
                console.error("Error fetching data for tab:", error);
            }
        }
    };
    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
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

    const calculateProfitOrLoss = (earningRate, allCost) => {
        const rate = parseFloat(earningRate);
        const originalCost = allCost / (1 + rate / 100);
        const profitOrLoss = allCost - originalCost;
        return Math.round(profitOrLoss);
    };

    const formatDateTime = (dateString) => {
        const [year, month, day, hour, minute] = dateString.split("-");
        return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
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
                    <div>{formatNumber(totalValue)}원</div>
                    <div
                        style={{
                            color:
                                calculateProfitOrLoss(earningRate, totalValue) <
                                0
                                    ? "#ff0000"
                                    : "#007bff",
                        }}
                    >
                        {calculateProfitOrLoss(earningRate, totalValue)}원 (
                        <span
                            style={{
                                color: earningRate < 0 ? "#ff0000" : "#007bff",
                            }}
                        >
                            {earningRate}%
                        </span>
                        )
                    </div>
                    <button
                        className={styles.sellButton}
                        onClick={() => navigate("/stock")}
                    >
                        판매하기
                    </button>
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
                        <div
                            className={`${styles.tabButton} ${
                                activeTab === "unsettled"
                                    ? styles.activeTab
                                    : ""
                            }`}
                            onClick={() => handleTabChange("unsettled")}
                        >
                            미체결 내역
                            {activeTab === "unsettled" && (
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
                            : activeTab === "transactions"
                            ? size
                            : unsettledTransactions.length}{" "}
                        건
                    </div>

                    <motion.div
                        key={activeTab}
                        className={styles.slide}
                        variants={variants}
                        initial={
                            isFirstRender && activeTab === "stocks"
                                ? false
                                : "enter"
                        }
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
                                            <div className={styles.stockInner}>
                                                <div
                                                    className={
                                                        styles.stockFront
                                                    }
                                                >
                                                    <img
                                                        src={`https://stock-craft.s3.ap-northeast-2.amazonaws.com/logos/${encodeURIComponent(
                                                            stock.name
                                                        )}.svg`}
                                                        alt={`${stock.name} 로고`}
                                                        className={
                                                            styles.stockLogo
                                                        }
                                                    />
                                                    <div
                                                        className={
                                                            styles.stockName
                                                        }
                                                    >
                                                        {stock.name}
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.stockQuantity
                                                        }
                                                    >
                                                        {" "}
                                                        {stock.holdStockCount.toFixed(
                                                            6
                                                        )}{" "}
                                                        주
                                                    </div>
                                                    <div
                                                        className={
                                                            stock.earningRate <
                                                            0
                                                                ? styles.negativeText
                                                                : stock.earningRate >
                                                                  0
                                                                ? styles.positiveText
                                                                : styles.neutralText
                                                        }
                                                    >
                                                        {formatNumber(
                                                            Math.floor(
                                                                (stock.holdStockCount *
                                                                    stock.averagePrice *
                                                                    stock.earningRate) /
                                                                    100
                                                            )
                                                        )}
                                                        원 ({stock.earningRate}
                                                        %)
                                                    </div>
                                                </div>
                                                <div
                                                    className={styles.stockBack}
                                                >
                                                    <div>
                                                        평균 단가 :{" "}
                                                        {formatNumber(stock.averagePrice)}원
                                                    </div>
                                                    <div>
                                                        평가 금액 :{" "}
                                                        {formatNumber(Math.floor(
                                                            stock.averagePrice *
                                                                stock.holdStockCount
                                                        ))}원
                                                    </div>

                                                    <button
                                                        className={
                                                            styles.sellButton2
                                                        }
                                                        onClick={() =>
                                                            navigate(
                                                                "/stock/chart",
                                                                {
                                                                    state: {
                                                                        stockCode:
                                                                            stock.stockCode,
                                                                    },
                                                                }
                                                            )
                                                        }
                                                    >
                                                        판매 하기
                                                    </button>
                                                </div>
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
                                    {transactions.map((transaction, index) => (
                                        <div
                                            key={transaction.id}
                                            className={styles.transaction}
                                        >
                                            <div>
                                                <img
                                                    src={`https://stock-craft.s3.ap-northeast-2.amazonaws.com/logos/${encodeURIComponent(
                                                        transaction.name
                                                    )}.svg`}
                                                    alt={`${transaction.name} 로고`}
                                                    className={styles.stockLogo}
                                                />
                                                <div
                                                    className={
                                                        styles.transactionDate
                                                    }
                                                >
                                                    {formatDateTime(
                                                        transaction.date
                                                    )}
                                                </div>
                                                <div className={styles.detail}>
                                                    <div
                                                        className={
                                                            styles.transactionStockName
                                                        }
                                                    >
                                                        {transaction.name}{" "}
                                                        {transaction.type ===
                                                        "in"
                                                            ? "획득"
                                                            : "판매"}
                                                    </div>
                                                    <div
                                                        className={`${
                                                            styles.transactionQuantity
                                                        } ${
                                                            transaction.type ===
                                                            "in"
                                                                ? styles.redText
                                                                : styles.blueText
                                                        }`}
                                                    >
                                                        {transaction.type ===
                                                        "in"
                                                            ? "+"
                                                            : "-"}
                                                        {transaction.amount} 주
                                                    </div>
                                                </div>
                                            </div>
                                            {index ===
                                                transactions.length - 1 && (
                                                <div
                                                    ref={
                                                        lastTransactionElementRef
                                                    }
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.noData}>
                                    거래 내역이 없습니다.
                                </div>
                            )
                        ) : activeTab === "unsettled" ? (
                            unsettledTransactions.length > 0 ? (
                                <div className={styles.unsettledList}>
                                    {unsettledTransactions.map((unsettled) => (
                                        <div
                                            key={unsettled.saleId}
                                            className={styles.unsettled}
                                        >
                                            <div>
                                                <img
                                                    src={`https://stock-craft.s3.ap-northeast-2.amazonaws.com/logos/${encodeURIComponent(
                                                        unsettled.enterpriseName
                                                    )}.svg`}
                                                    alt={`${unsettled.enterpriseName} 로고`}
                                                    className={styles.stockLogo}
                                                />
                                                <div
                                                    className={
                                                        styles.dateButton
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.transactionDate
                                                        }
                                                    >
                                                        {formatDateTime(
                                                            unsettled.date
                                                        )}
                                                    </div>

                                                    <button
                                                        className={
                                                            styles.cancelButton
                                                        }
                                                        onClick={() =>
                                                            handleCancelUnsettled(
                                                                unsettled.saleId
                                                            )
                                                        }
                                                    >
                                                        취소
                                                    </button>
                                                </div>
                                                <div className={styles.detail}>
                                                    <div
                                                        className={
                                                            styles.transactionStockName
                                                        }
                                                    >
                                                        {
                                                            unsettled.enterpriseName
                                                        }{" "}
                                                        미체결
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.transactionQuantity
                                                        }
                                                    >
                                                        {unsettled.amount} 주
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.noData}>
                                    미체결 내역이 없습니다.
                                </div>
                            )
                        ) : null}
                    </motion.div>
                </div>
                {showCancelModal && (
                    <CancelModal
                        saleId={selectedSaleId}
                        onClose={() => setShowCancelModal(false)}
                        onCancel={confirmCancel}
                    />
                )}
            </div>
        </motion.div>
    );
}
