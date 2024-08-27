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

    return (
        <div className={`${styles.bar} ${isDarkMode ? styles.darkMode : ""}`}>
            <div className={styles.group}>
                <div className={styles.item} onClick={() => navigate("/home")}>
                    <img
                        src={isDarkMode ? homeIconDark : homeIcon}
                        alt="Home"
                        className={styles.icon}
                    />
                    <div className={styles.text}>홈</div>
                </div>
                <div
                    className={styles.item}
                    onClick={() => navigate("/reward")}
                >
                    <img
                        src={isDarkMode ? rewardIconDark : rewardIcon}
                        alt="Reward"
                        className={styles.icon}
                    />
                    <div className={styles.text}>리워드</div>
                </div>
                <div className={styles.item} onClick={() => navigate("/stock")}>
                    <img
                        src={isDarkMode ? searchIconDark : searchIcon}
                        alt="Search"
                        className={styles.icon}
                    />
                    <div className={styles.text}>주식 검색</div>
                </div>
                <div className={styles.item} onClick={() => navigate("/my")}>
                    <img
                        src={isDarkMode ? profileIconDark : profileIcon}
                        alt="Profile"
                        className={styles.icon}
                    />
                    <div className={styles.text}>내 정보</div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
