import React from "react";
import { motion } from "framer-motion";
import warning from "~assets/my/warning.svg"
import styles from "./LogoutModal.module.css";

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
                <img src={warning} className={styles.icon}/>
                <div className={styles.logoutText}>정말 로그아웃 하시겠습니까?</div>
                <div className={styles.modalButtons}>
                    <button
                        className={styles.cancelButton}
                        onClick={onClose}
                    >
                        취소
                    </button>
                    <button
                        className={styles.confirmButton}
                        onClick={confirm}
                    >
                        로그아웃
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
