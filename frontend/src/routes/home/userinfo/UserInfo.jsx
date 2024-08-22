import React from "react";
import { motion } from "framer-motion";
import "./UserInfo.css";

export default function UserInfo() {
    return (
        <div className="user-info">
            <div className="user-name">양진혁 님</div>
            <div className="line2"></div>
            <div className="user-actions">
                <motion.div
                    className="user-actions-item"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="calendar"></div>
                    <div className="action-item">출석체크</div>
                </motion.div>
                <motion.div
                    className="user-actions-item"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="point"></div>
                    <div className="action-item">포인트 내역</div>
                </motion.div>
                <motion.div
                    className="user-actions-item"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="use"></div>
                    <div className="action-item">이용방법</div>
                </motion.div>
                <motion.div
                    className="user-actions-item"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="faq"></div>
                    <div className="action-item">FAQ</div>
                </motion.div>
            </div>
        </div>
    );
}
