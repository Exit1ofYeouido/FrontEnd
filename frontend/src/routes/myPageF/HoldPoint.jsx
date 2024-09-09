import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import styles from "./HoldPoint.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
    getPointStock,
    getPointHistory,
    preWithdrawPoint,
    withdrawPoint,
} from "~apis/myAPI/myApi";
import WithdrawModal from "./WithdrawModal";
import { showToast } from "~components/Toast";

export default function HoldPoint() {
    const [totalValue, setTotalValue] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [accountNumber, setAccountNumber] = useState("");
    const [availablePoints, setAvailablePoints] = useState(0);
    const observer = useRef();
    const [totalSize, setTotalSize] = useState(0);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/my");
    };

    const loadMoreTransactions = async (page) => {
        try {
            const response = await getPointHistory(page);
            const { size, pointHistory } = response;

            setTransactions((prevTransactions) => [
                ...prevTransactions,
                ...pointHistory,
            ]);
            setTotalSize(size);
            setHasMore(pointHistory.length === 6);
        } catch (error) {
            console.error(
                "Error fetching data:",
                error.response?.data || error.message
            );
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const holdPointData = await getPointStock();
                setTotalValue(holdPointData.point);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        loadMoreTransactions(page);
    }, [page]);

    const lastTransactionElementRef = useCallback(
        (node) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [hasMore]
    );

    const handleWithdrawClick = async () => {
        try {
            const response = await preWithdrawPoint();
            setAccountNumber(response.accountNumber);
            setAvailablePoints(response.totalPoint);
            setShowModal(true);
        } catch (error) {
            console.error("Error fetching pre-withdrawal data:", error);
        }
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    };

    const handleWithdraw = async (withdrawalAmount) => {
        try {
            await withdrawPoint(withdrawalAmount, accountNumber);
            const updatedPointData = await getPointStock();
            setTotalValue(updatedPointData.point);

            const updatedTransactions = await getPointHistory(0);
            setTransactions(updatedTransactions.pointHistory);
            setPage(0);
            showToast("success", "출금이 완료되었습니다.");
            setShowModal(false);
        } catch (error) {
            showToast("error", "출금에 실패했습니다.");
        }
    };

    const formatDateTime = (dateString) => {
        const [year, month, day, hour, minute] = dateString.split("-");
        return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
    };

    return (
        <motion.div
            key="hold-point"
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
                    <div>{formatNumber(totalValue)}원</div>
                    <button
                        className={styles.sellButton}
                        onClick={handleWithdrawClick}
                    >
                        출금하기
                    </button>
                </div>

                <div className={styles.stockContainer}>
                    <div className={styles.tabs}>
                        <div
                            className={`${styles.tabButton} ${styles.activeTab}`}
                        >
                            포인트 내역
                            <motion.div
                                className={styles.underline}
                                layoutId="underline"
                            />
                        </div>
                    </div>

                    <div className={styles.totalCount}>총 {totalSize} 건</div>

                    {transactions.length > 0 ? (
                        <div className={styles.transactionsList}>
                            {transactions.map((transaction, index) => (
                                <div
                                    key={transaction.id}
                                    className={styles.transaction}
                                >
                                    <div className={styles.transactionDate}>
                                        {formatDateTime(transaction.date)}
                                    </div>
                                    <div className={styles.detail}>
                                        <div className={styles.datailStock}>
                                            <div
                                                className={
                                                    styles.transactionStockName
                                                }
                                            >
                                                포인트
                                                {transaction.type === "in"
                                                    ? "획득"
                                                    : "출금"}
                                            </div>
                                            <div
                                                className={
                                                    transaction.type === "in"
                                                        ? styles.redText
                                                        : styles.blueText
                                                }
                                            >
                                                {transaction.type === "in"
                                                    ? "+"
                                                    : "-"}
                                                {formatNumber(
                                                    transaction.requestPoint
                                                )}{" "}
                                                원
                                            </div>
                                        </div>
                                        <div>
                                            잔액 :{" "}
                                            {formatNumber(
                                                transaction.resultPoint
                                            )}{" "}
                                            원
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={lastTransactionElementRef} />
                        </div>
                    ) : (
                        <div className={styles.noTransactions}>
                            내역이 없습니다
                        </div>
                    )}
                </div>

                {showModal && (
                    <WithdrawModal
                        onClose={() => setShowModal(false)}
                        accountNumber={accountNumber}
                        availablePoints={availablePoints}
                        onWithdraw={handleWithdraw}
                    />
                )}
            </div>
        </motion.div>
    );
}
