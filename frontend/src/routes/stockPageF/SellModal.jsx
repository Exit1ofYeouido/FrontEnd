import React, { useState } from "react";
import styles from "./SellModal.module.css";

export default function SellModal({ onClose, stockName, totalAmount, shareAmount, fee, onSell }) {
    const [quantity, setQuantity] = useState(shareAmount);

    const handleSell = () => {
        onSell(quantity);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>{stockName}</h2>
                <p className={styles.modalTitle}>판매 예약</p>
                <p className={styles.subTitle}>오늘 오후 10시 30분 주문 예정</p>

                <div className={styles.details}>
                    <div className={styles.row}>
                        <span>1주 희망 가격</span>
                        <span className={styles.value}>시장가</span>
                    </div>
                    <div className={styles.row}>
                        <span>예상 수수료</span>
                        <span className={styles.value}>{fee}원</span>
                    </div>
                    <div className={styles.row}>
                        <span>주문 수량</span>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className={styles.input}
                            min="0"
                            step="0.000001"
                        />
                    </div>
                    <div className={styles.row}>
                        <span>총 예상 주문 금액</span>
                        <span className={styles.value}>{totalAmount}원</span>
                    </div>
                </div>

                <div className={styles.footer}>
                    <label className={styles.checkbox}>
                        <input type="checkbox" /> 다음부터 인증 없이 거래하기
                    </label>

                    <div className={styles.actions}>
                        <button className={styles.cancelButton} onClick={onClose}>닫기</button>
                        <button className={styles.sellButton} onClick={handleSell}>판매</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
