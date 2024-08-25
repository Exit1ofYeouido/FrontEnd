import React from "react";
import styles from "./AttendanceModal.module.css";

export default function AttendanceModal({ show, onClose, children }) {
    if (!show) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {children}
                <div className={styles.buttonGroup}>
                    <button onClick={onClose} className={styles.companyButton}>
                        기업 보기
                    </button>
                    <button onClick={onClose} className={styles.closeButton}>
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}
