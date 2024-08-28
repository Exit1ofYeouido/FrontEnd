import React from "react";
import styles from "./Quiz.module.css";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

export default function Quiz({ onClose }) {
    return (
        <motion.div
            initial={{ y: "0%", opacity: 1 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className={styles.container}
        >
            <div className={styles.closeButton} onClick={onClose}>
                <IoMdClose />
            </div>
            <div className={styles.question}>안녕하세요</div>
            <div className={styles.selection}>
                <div className={styles.select}>1</div>
                <div className={styles.select}>2</div>
                <div className={styles.select}>3</div>
                <div className={styles.select}>4</div>
            </div>
        </motion.div>
    );
}
