import React from "react";
import { motion } from "framer-motion";
import Navbar from "~components/Navbar";
import Reward from "./reward/Reward";
import Brand from "./brand/brand";
import Asset from "./asset/Asset";
import UserInfo from "./userinfo/UserInfo";
import "./HomePage.css";

function HomePage() {
    return (
        <div className="home-page">
            <Navbar />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="home-content"
            >
                <div className="home-wrapper">
                    <div className="logo"></div>
                    <Brand />
                    <Asset />
                    <UserInfo />
                    <Reward />
                </div>
            </motion.div>
        </div>
    );
}

export default HomePage;
