import React from "react";
import "./Brand.css";

// 이미지 파일을 import합니다.
import logo1 from "../../../assets/starbucks.svg";
import logo2 from "../../../assets/shinhan.svg";
import logo3 from "../../../assets/lg.svg";
import logo4 from "../../../assets/samsung.svg";

const logos = [logo1, logo2, logo3, logo4];

export default function Brand() {
    return (
        <div>
            <div className="home-text">
                오늘은 어떤 주식을 받을 수 있을까요?
            </div>
            <div className="brand-container">
                {logos.map((logo, index) => (
                    <div
                        key={index}
                        className="brand-logo"
                        style={{
                            backgroundImage: `url(${logo})`,
                            animationDelay: `${index * 2}s`,
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}
