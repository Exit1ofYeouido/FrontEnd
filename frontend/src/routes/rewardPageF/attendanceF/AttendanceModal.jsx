import React from "react";
import styles from "./AttendanceModal.module.css";

export default function AttendanceModal({
    onClose,
    company,
    amount,
    goCompany,
}) {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.company}>
                    <img
                        src={`https://stock-craft.s3.ap-northeast-2.amazonaws.com/logos/${encodeURIComponent(
                            company
                        )}.svg`}
                        alt={`${company} logo`}
                        className={styles.logo}
                    />
                    <div className={styles.companyName}>{company}</div>
                </div>
                <div className={styles.stockText}>
                    <div className={styles.stockAmount}>{amount}</div>
                    주가 도착했어요!
                </div>
                <div className={styles.buttonContainer}>
                    <button onClick={goCompany} className={styles.goCompany}>
                        기업 보기
                    </button>
                    <button onClick={onClose} className={styles.confirm}>
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}
