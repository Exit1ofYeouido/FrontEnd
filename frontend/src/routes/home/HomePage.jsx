import React from "react";
import { motion } from "framer-motion";
import Navbar from "~components/Navbar";
import Reward from "./reward/Reward";
import Brand from "./brand/brand";
import Asset from "./asset/Asset";
import UserInfo from "./userinfo/UserInfo";
import "./HomePage.css";

export default function HomePage() {
    return (
        <div>
            <div className="home-wrapper">
                <div className="logo"></div>
                <Brand />
                <Asset />
                <UserInfo />
                <Reward />
            </div>
            <Navbar />
        </div>
    );
}
