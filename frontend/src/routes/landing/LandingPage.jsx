import React from "react";
import Logo from "../../assets/Logo.svg";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    const goLogin = () => {
        navigate("/login");
    };

    return (
        <div className="main">
            <img src={Logo} alt="Logo" />
            <button className="start_button" onClick={goLogin}>
                시작하기
            </button>
        </div>
    );
}
