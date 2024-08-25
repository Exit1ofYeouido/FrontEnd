import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import homeIcon from "~assets/navbar/home.svg";
import rewardIcon from "~assets/navbar/reward.svg";
import searchIcon from "~assets/navbar/search.svg";
import profileIcon from "~assets/navbar/profile.svg";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.bar}>
            <div className={styles.group}>
                <div className={styles.item} onClick={() => navigate("/home")}>
                    <img src={homeIcon} alt="Home" className={styles.icon} />
                    <div className={styles.text}>홈</div>
                </div>
                <div className={styles.item} onClick={() => navigate("/reward")}>
                    <img src={rewardIcon} alt="Reward" className={styles.icon} />
                    <div className={styles.text}>리워드</div>
                </div>
                <div className={styles.item} onClick={() => navigate("/stock")}>
                    <img src={searchIcon} alt="Search" className={styles.icon} />
                    <div className={styles.text}>주식 검색</div>
                </div>
                <div className={styles.item} onClick={() => navigate("/my")}>
                    <img src={profileIcon} alt="Profile" className={styles.icon} />
                    <div className={styles.text}>내 정보</div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
