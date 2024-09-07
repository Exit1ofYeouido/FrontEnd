import React, { useState, useEffect } from "react";
import styles from "./SellModal.module.css";

export default function SellModal({
    onClose,
    stockName,
    availableAmount,
    onSell,
    currentPrice,
}) {
    const [calculatedTotal, setCalculatedTotal] = useState(0);

    useEffect(() => {
        setCalculatedTotal((availableAmount * currentPrice).toFixed(0));
    }, [availableAmount, currentPrice]);

    const handleSell = () => {
        onSell(availableAmount);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>{stockName}</h2>
                <p className={styles.modalTitle}>판매 예약</p>
                <p className={styles.subTitle}>오늘 오후 3시 주문 예정</p>

                <div className={styles.details}>
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
                        <span className={styles.value}>
                            {availableAmount.toFixed(6)}주
                        </span>{" "}
                    </div>
                    <div className={styles.row}>
                        <span>총 예상 주문 금액</span>
                        <span className={styles.value}>
                            {calculatedTotal}원
                        </span>
                    </div>
                </div>

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
                            onClick={handleSell}
                        >
                            판매
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
