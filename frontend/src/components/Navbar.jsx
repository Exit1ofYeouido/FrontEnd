import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import homeIcon from "~assets/navbar/home.svg";
import rewardIcon from "~assets/navbar/reward.svg";
import searchIcon from "~assets/navbar/search.svg";
import profileIcon from "~assets/navbar/profile.svg";
import homeIconDark from "~assets/navbar/home-dark.svg";
import rewardIconDark from "~assets/navbar/reward-dark.svg";
import searchIconDark from "~assets/navbar/search-dark.svg";
import profileIconDark from "~assets/navbar/profile-dark.svg";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isDarkMode = location.pathname.startsWith("/reward/videodetail");

    const navItems = [
        { path: "/home", icon: homeIcon, darkIcon: homeIconDark, text: "홈" },
        { path: "/reward", icon: rewardIcon, darkIcon: rewardIconDark, text: "리워드" },
        { path: "/stock", icon: searchIcon, darkIcon: searchIconDark, text: "주식 검색" },
        { path: "/my", icon: profileIcon, darkIcon: profileIconDark, text: "내 정보" },
    ];

    return (
        <nav className={`${styles.bar} ${isDarkMode ? styles.darkMode : ""}`}>
            <div className={styles.group}>
                {navItems.map((item) => (
                    <div
                        key={item.path}
                        className={`${styles.item} ${location.pathname === item.path ? styles.active : ""}`}
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