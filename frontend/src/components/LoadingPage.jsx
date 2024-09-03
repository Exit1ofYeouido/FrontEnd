import React from "react";
import { motion } from "framer-motion";
import styles from "./LoadingPage.module.css";

export default function LoadingPage() {
    return (
        <div className={styles.loadingContainer}>
            <motion.div
                className={styles.spinner}
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear",
                }}
            />
            <div className={styles.loadingText}>Loading...</div>
        </div>
    );
}
