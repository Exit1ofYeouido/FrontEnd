import React from "react";
import styles from "./CancelModal.module.css";

export default function CancelModal({ saleId, onClose, onCancel }) {
    const handleCancel = () => {
        onCancel(saleId);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>취소하시겠습니까?</h2>
                <p>정말로 해당 주문을 취소하시겠습니까?</p>

                <div className={styles.actions}>
                    <button className={styles.cancelButton} onClick={onClose}>
                        닫기
                    </button>
                    <button className={styles.confirmButton} onClick={handleCancel}>
                        취소하기
                    </button>
                </div>
            </div>
        </div>
    );
}
