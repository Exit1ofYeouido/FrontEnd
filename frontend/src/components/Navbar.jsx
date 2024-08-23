import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import homeIcon from "~assets/navbar/home.svg";
import rewardIcon from "~assets/navbar/reward.svg";
import searchIcon from "~assets/navbar/search.svg";
import profileIcon from "~assets/navbar/profile.svg";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className="navbar">
            <div className="nav-four">
                <div className="nav-item" onClick={() => navigate("/home")}>
                    <img src={homeIcon} alt="Home" className="nav-icon" />
                    <div className="nav-text">홈</div>
                </div>
                <div className="nav-item" onClick={() => navigate("/reward")}>
                    <img src={rewardIcon} alt="Reward" className="nav-icon" />
                    <div className="nav-text">리워드</div>
                </div>
                <div className="nav-item" onClick={() => navigate("/stock")}>
                    <img src={searchIcon} alt="Search" className="nav-icon" />
                    <div className="nav-text">주식 검색</div>
                </div>
                <div className="nav-item" onClick={() => navigate("/my")}>
                    <img src={profileIcon} alt="Profile" className="nav-icon" />
                    <div className="nav-text">내 정보</div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
