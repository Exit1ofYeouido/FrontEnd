import React from "react";
import styles from "./AttendanceModal.module.css"; // 모달 스타일 추가

export default function AttendanceModal({ show, onClose, children }) {
    if (!show) return null; // 모달이 보이지 않을 때 null 반환

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {children}
                <button onClick={onClose} className={styles.closeButton}>
                    닫기
                </button>
            </div>
        </div>
    );
}
