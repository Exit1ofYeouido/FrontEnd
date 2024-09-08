import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

const homeIcon =
    "https://stock-craft.s3.ap-northeast-2.amazonaws.com/navbar/home.svg";
const rewardIcon =
    "https://stock-craft.s3.ap-northeast-2.amazonaws.com/navbar/reward.svg";
const searchIcon =
    "https://stock-craft.s3.ap-northeast-2.amazonaws.com/navbar/search.svg";
const profileIcon =
    "https://stock-craft.s3.ap-northeast-2.amazonaws.com/navbar/profile.svg";

const homeIconDark =
    "https://stock-craft.s3.ap-northeast-2.amazonaws.com/navbar/home-dark.svg";
const rewardIconDark =
    "https://stock-craft.s3.ap-northeast-2.amazonaws.com/navbar/reward-dark.svg";
const searchIconDark =
    "https://stock-craft.s3.ap-northeast-2.amazonaws.com/navbar/search-dark.svg";
const profileIconDark =
    "https://stock-craft.s3.ap-northeast-2.amazonaws.com/navbar/profile-dark.svg";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isDarkMode = location.pathname.startsWith("/reward/videodetail");

    const navItems = [
        { path: "/home", icon: homeIcon, darkIcon: homeIconDark, text: "홈" },
        {
            path: "/reward",
            icon: rewardIcon,
            darkIcon: rewardIconDark,
            text: "리워드",
        },
        {
            path: "/stock",
            icon: searchIcon,
            darkIcon: searchIconDark,
            text: "주식 검색",
        },
        {
            path: "/my",
            icon: profileIcon,
            darkIcon: profileIconDark,
            text: "내 정보",
        },
    ];

    return (
        <nav className={`${styles.bar} ${isDarkMode ? styles.darkMode : ""}`}>
            <div className={styles.group}>
                {navItems.map((item) => (
                    <div
                        key={item.path}
                        className={`${styles.item} ${
                            location.pathname === item.path ? styles.active : ""
                        }`}
                        onClick={() => navigate(item.path)}
                    >
                        <img
                            src={isDarkMode ? item.darkIcon : item.icon}
                            alt={item.text}
                            className={styles.icon}
                        />
                        <div className={styles.text}>{item.text}</div>
                    </div>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
