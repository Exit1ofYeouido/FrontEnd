import React from "react";
import "./Reward.css";

export default function Reward() {
    return (
        <div className="reward-section">
            <div className="reward-title">리워드</div>
            <div className="video-section">
                <div className="video"></div>
                <div className="video-text">
                    <div className="video-title">기업 영상 시청</div>
                    <div className="video-description">
                        내가 원하는 기업 광고를 재미있게 시청하고 주식 받자!
                    </div>
                </div>
            </div>
            <div className="receipt-section">
                <div className="receipt"></div>
                <div className="receipt-text">
                    <div className="receipt-title">영수증 인증</div>
                    <div className="receipt-description">
                        좋아하는 물품을 사고나서 해당 기업의 주식을 받을 수
                        있어요!
                    </div>
                </div>
            </div>
        </div>
    );
}
