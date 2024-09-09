import React, { useState, useEffect } from "react";
import styles from "./SellModal.module.css";
import { preSellStock } from "~apis/stockAPI/sellStockApi";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

export default function SellModal({
    onClose,
    stockCode,
    stockName,
    currentPrice,
    onSell,
}) {
    const [availableAmount, setAvailableAmount] = useState(0);
    const [minSaleAmount, setMinSaleAmount] = useState(0);
    const [calculatedTotal, setCalculatedTotal] = useState(0);
    const [autoSellAll, setAutoSellAll] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm();
    const sellAmount = watch("sellAmount", 0);

    useEffect(() => {
        const fetchPreSellData = async () => {
            try {
                const data = await preSellStock(stockCode);
                setAvailableAmount(parseFloat(data.holdingAmount));
                setMinSaleAmount(parseFloat(data.minSaleAmount));

                if (
                    parseFloat(data.holdingAmount) <
                    parseFloat(data.minSaleAmount)
                ) {
                    setAutoSellAll(true);
                    setValue("sellAmount", parseFloat(data.holdingAmount));
                }
            } catch (error) {
                console.error("Error fetching pre-sell data:", error);
            }
        };

        fetchPreSellData();
    }, [stockCode, setValue]);

    useEffect(() => {
        setCalculatedTotal((sellAmount * currentPrice).toFixed(0));
    }, [sellAmount, currentPrice]);

    const handleSell = (data) => {
        onSell(data.sellAmount);
    };

    const modalContentVariants = {
        hidden: { y: "100%", opacity: 0 },
        visible: { y: "0%", opacity: 1, transition: { duration: 0.3 } },
        exit: { y: "100%", opacity: 0, transition: { duration: 0.3 } },
    };

    const isSellDisabled = availableAmount === 0;
    return (
        <div className={styles.modalOverlay}>
            <motion.div
                className={styles.modalContent}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalContentVariants}
            >
                <h2>{stockName}</h2>
                <p className={styles.modalTitle}>판매 예약</p>
                <p className={styles.subTitle}>오후 3시 주문 예정</p>

                <div className={styles.details}>
                    <div className={styles.row}>
                        <span>보유 주식</span>
                        <span className={styles.value}>
                            {availableAmount === 0
                                ? "0주"
                                : availableAmount.toFixed(6) + "주"}
                        </span>
                    </div>
                    <div className={styles.row}>
                        <span>1주 희망 가격</span>
                        <span className={styles.value}>시장가</span>
                    </div>
                    <div className={styles.row}>
                        <span>현재가</span>
                        <span className={styles.value}>{currentPrice}원</span>
                    </div>
                    <div className={styles.row}>
                        <span>주문 수량</span>
                        {isSellDisabled ? (
                            <span className={styles.error}>
                                보유하지 않는 주식입니다.
                            </span>
                        ) : autoSellAll ? (
                            <span className={styles.value}>
                                {availableAmount.toFixed(6)}주 (전량 매도)
                            </span>
                        ) : availableAmount >= minSaleAmount ? (
                            <form onSubmit={handleSubmit(handleSell)}>
                                <input
                                    {...register("sellAmount", {
                                        required: "주문 수량을 입력해주세요.",
                                        min: {
                                            value: minSaleAmount,
                                            message: `최소 ${minSaleAmount}주 이상 입력해야 합니다.`,
                                        },
                                        max: {
                                            value: availableAmount,
                                            message: `최대 ${availableAmount.toFixed(
                                                6
                                            )}주까지 입력 가능합니다.`,
                                        },
                                    })}
                                    type="number"
                                    className={styles.input}
                                    placeholder={`최소 ${minSaleAmount}`}
                                />
                            </form>
                        ) : (
                            <span className={styles.error}>
                                최소 {minSaleAmount}주부터 주문 가능합니다.
                            </span>
                        )}
                    </div>
                    <div className={styles.row}>
                        <span>총 예상 주문 금액</span>
                        <span className={styles.value}>
                            {calculatedTotal}원
                        </span>
                    </div>
                </div>

                {errors.sellAmount && (
                    <div className={styles.errorMessage}>
                        {errors.sellAmount.message}
                    </div>
                )}

                <div className={styles.footer}>
                    <div className={styles.actions}>
                        <button
                            className={styles.cancelButton}
                            onClick={onClose}
                        >
                            닫기
                        </button>
                        <button
                            className={styles.sellButton}
                            onClick={handleSubmit(handleSell)}
                            disabled={isSellDisabled}
                            style={{
                                backgroundColor: isSellDisabled
                                    ? "#ccc"
                                    : "#007bff",
                            }}
                        >
                            판매
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
