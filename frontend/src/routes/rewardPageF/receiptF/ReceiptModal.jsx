import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ReceiptModal.module.css";

export default function ReceiptModal({ receiptData, onConfirm, onCancel }) {
    const [isImageZoomed, setIsImageZoomed] = useState(false);

    const handleImageClick = () => {
        setIsImageZoomed(!isImageZoomed);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.text}>
                    아래 정보가 맞는지 확인해주세요
                </div>
                <div className={styles.click}>이미지 클릭시 확대됩니다.</div>
                {receiptData && (
                    <div className={styles.receiptData}>
                        <img
                            src={`https://stock-craft.s3.ap-northeast-2.amazonaws.com/${receiptData.imgURL}`}
                            alt="영수증 이미지"
                            className={styles.receiptImage}
                            onClick={handleImageClick}
                        />
                        <div className={styles.info}>
                            <div>이름: {receiptData.storeName}</div>
                            <div>가격: {receiptData.price}원</div>
                            <div>거래 시간: {receiptData.dealTime}</div>
                            <div>확인 번호: {receiptData.approvalNum}</div>
                            <div>기업 이름: {receiptData.enterpriseName}</div>
                        </div>
                    </div>
                )}
                <div className={styles.modalActions}>
                    <button
                        onClick={onConfirm}
                        className={styles.confirmButton}
                    >
                        맞아요
                    </button>
                    <button onClick={onCancel} className={styles.cancelButton}>
                        아니에요
                    </button>
                </div>
            </div>
            {isImageZoomed && (
                <div
                    className={styles.imageZoomModal}
                    onClick={handleImageClick}
                >
                    <img
                        src={`https://stock-craft.s3.ap-northeast-2.amazonaws.com/${receiptData.imgURL}`}
                        alt="영수증 이미지 확대"
                        className={styles.zoomedImage}
                    />
                </div>
            )}
        </div>
    );
}
