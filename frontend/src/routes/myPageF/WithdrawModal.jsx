import React, { useState } from "react";
import styles from "./WithdrawModal.module.css";

import { AiOutlineClose } from "react-icons/ai";
import { showToast } from "~components/Toast";
import { motion } from "framer-motion";

const accountLogo =
    "https://stock-craft.s3.ap-northeast-2.amazonaws.com/my/accountLogo.svg";

export default function WithdrawModal({
    onClose,
    accountNumber,
    availablePoints,
    onWithdraw,
}) {
    const [withdrawalAmount, setWithdrawalAmount] = useState("");

    const handleWithdraw = () => {
        if (withdrawalAmount > 0) {
            onWithdraw(withdrawalAmount);
        } else {
            showToast("error", "출금 금액을 입력하세요.");
        }
    };

    const modalContentVariants = {
        hidden: { y: "100%", opacity: 0 },
        visible: { y: "0%", opacity: 1, transition: { duration: 0.3 } },
        exit: { y: "100%", opacity: 0, transition: { duration: 0.3 } },
    };

    return (
        <div className={styles.modalOverlay}>
            <motion.div
                className={styles.modalContent}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalContentVariants}
            >
                <div className={styles.closeButton} onClick={onClose}>
                    <AiOutlineClose />
                </div>
                <img
                    src={accountLogo}
                    alt="Account Logo"
                    className={styles.accountLogo}
                />
                <div className={styles.accountNumber}>{accountNumber}</div>
                <p className={styles.modalTitle}>
                    해당 계좌로 출금하시겠습니까?
                </p>
                <p className={styles.subTitle}>출금 희망 금액을 입력하세요</p>

                <input
                    type="text"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    className={styles.input}
                    placeholder="출금 금액"
                />

                <button
                    className={styles.withdrawButton}
                    onClick={handleWithdraw}
                >
                    출금하기
                </button>
            </motion.div>
        </div>
    );
}
