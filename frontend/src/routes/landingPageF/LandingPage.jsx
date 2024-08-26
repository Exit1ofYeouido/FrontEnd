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
            <img src={Logo} alt="Logo" />
            <button className={styles.button} onClick={goLogin}>
                시작하기
            </button>
        </div>
    );
}
