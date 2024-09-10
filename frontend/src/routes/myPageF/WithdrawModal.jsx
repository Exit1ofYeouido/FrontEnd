import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
    const [isSubmitting, setIsSubmitting] = useState(false); // 상태 관리
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const formatCurrency = (value) => {
        const cleanedValue = value.replace(/[^0-9]/g, "");
        if (!cleanedValue) return "";
        return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleAmountChange = (e) => {
        const { value } = e.target;
        const formattedValue = formatCurrency(value);
        setValue("withdrawalAmount", formattedValue);
    };

    const onSubmit = async (data) => {
        const { withdrawalAmount } = data;
        const numericAmount = parseFloat(withdrawalAmount.replace(/,/g, ""));

        if (numericAmount >= 100) {
            if (!isSubmitting) {
                setIsSubmitting(true);
                await onWithdraw(numericAmount);
                setIsSubmitting(false);
            }
        } else {
            showToast("error", "출금은 최소 100원이상 가능합니다.");
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
                <div className={styles.modalTitle}>
                    해당 계좌로 출금하시겠습니까?
                </div>
                <div className={styles.subTitle}>
                    출금 희망 금액을 입력하세요
                </div>

                <div>
                    <input
                        type="text"
                        {...register("withdrawalAmount", {
                            required: "출금 금액을 입력하세요",
                            validate: (value) => {
                                const numericAmount = parseFloat(
                                    value.replace(/,/g, "")
                                );
                                if (isNaN(numericAmount)) {
                                    return "숫자만 입력할 수 있습니다.";
                                } else if (numericAmount <= 0) {
                                    return "출금 금액은 0보다 커야 합니다.";
                                }
                                return true;
                            },
                        })}
                        className={styles.input}
                        placeholder="출금 금액"
                        onChange={handleAmountChange}
                    />
                    {errors.withdrawalAmount && (
                        <div className={styles.error}>
                            {errors.withdrawalAmount.message}
                        </div>
                    )}
                </div>

                <div>
                    <button
                        className={styles.withdrawButton}
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "처리 중..." : "출금하기"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
