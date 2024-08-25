import React from "react";
import { motion } from "framer-motion";
import Navbar from "~components/Navbar";
import Reward from "./reward/Reward";
import Brand from "./brand/Brand";
import Asset from "./asset/Asset";
import UserInfo from "./userinfo/UserInfo";
import styles from "./HomePage.module.css";

function HomePage() {
    return (
        <div className={styles.page}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={styles.content}
            >
                <div className={styles.wrapper}>
                    <Brand />
                    <Asset />
                    <UserInfo />
                    <Reward />
                </div>
            </motion.div>
            <Navbar />
        </div>
    );
}

export default HomePage;
