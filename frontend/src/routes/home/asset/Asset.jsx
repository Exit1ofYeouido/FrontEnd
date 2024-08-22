import React from "react";
import "./Asset.css";

export default function Asset() {
    return (
        <div className="asset-info">
            <div className="asset-title">내 자산</div>
            <div className="asset-details">
                <div className="asset-amount">200,000원</div>
                <div className="asset-more">더 보기</div>
            </div>
            <div className="asset-earningrate">0원 (0.00%)</div>
            <div className="line"></div>
            <div className="sub-asset-info">
                <div className="sub-asset-stock">
                    <div className="my-stock">내 주식</div>
                    <div className="my-stock-amount">10,000원</div>
                </div>
                <div className="sub-asset-point">
                    <div className="my-point">내 포인트</div>
                    <div className="my-point-amount">10,000점</div>
                </div>
            </div>
        </div>
    );
}
