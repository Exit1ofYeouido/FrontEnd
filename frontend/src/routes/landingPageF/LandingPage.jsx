import React from "react";
import Logo from "../../assets/Logo.svg";
import styles from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    const goLogin = () => {
        navigate("/login");
    };

    return (
        <div className={styles.container}>
            <img src={Logo} alt="Logo" className={styles.logo}/>
            <div className={styles.title}>소수점 주식 플랫폼</div>
            <div className={styles.title}>스탁크래프트</div>
            <p className={styles.description}>
                광고, 영수증 인증을 통해 소수점 주식을 받아요
                <br/>
                클릭 몇 번으로 간단히 주주가 되어보세요!
            </p>
            <button className={styles.button} onClick={goLogin}>
                시작하기
            </button>
        </div>
    );
}