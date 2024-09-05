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
            <h1 className={styles.title}>소소한 주식, 큰 혜택으로</h1>
            <p className={styles.description}>
                소수점 주식을 모아 투자하세요.
                <br/>
                작은 금액으로 시작하는 스마트한 앱테크!
            </p>
            <button className={styles.button} onClick={goLogin}>
                시작하기
            </button>
        </div>
    );
}