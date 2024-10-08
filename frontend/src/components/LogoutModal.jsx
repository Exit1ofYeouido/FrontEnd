import React from "react";
import { motion } from "framer-motion";
import styles from "./LogoutModal.module.css";

const warning =
    "https://stock-craft.s3.ap-northeast-2.amazonaws.com/my/warning.svg";

export default function LogoutModal({ onClose, confirm }) {
    return (
        <div className={styles.modalOverlay}>
            <motion.div
                className={styles.modalContent}
                initial={{ y: "100vh", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100vh", opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <img src={warning} className={styles.icon} />
                <div className={styles.logoutText}>
                    로그아웃 하시겠습니까?
                </div>
                <div className={styles.modalButtons}>
                    <button className={styles.cancelButton} onClick={onClose}>
                        취소
                    </button>
                    <button className={styles.confirmButton} onClick={confirm}>
                        로그아웃
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
