import React, { useEffect, useState } from "react";
import styles from "./Brand.module.css";

const logos1 = [
    "https://stock-craft.s3.ap-northeast-2.amazonaws.com/brand_logo/starbucks.svg",
    "https://stock-craft.s3.ap-northeast-2.amazonaws.com/brand_logo/cocacola.svg",
    "https://stock-craft.s3.ap-northeast-2.amazonaws.com/brand_logo/apple.svg",
    "https://stock-craft.s3.ap-northeast-2.amazonaws.com/brand_logo/shinhan.svg",
];

const logos2 = [
    "https://stock-craft.s3.ap-northeast-2.amazonaws.com/brand_logo/jls.svg",
    "https://stock-craft.s3.ap-northeast-2.amazonaws.com/brand_logo/emtek.svg",
    "https://stock-craft.s3.ap-northeast-2.amazonaws.com/brand_logo/samsung.svg",
    "https://stock-craft.s3.ap-northeast-2.amazonaws.com/brand_logo/lg.svg",
];

export default function Brand() {
    const [selectedLogos, setSelectedLogos] = useState([]);

    useEffect(() => {
        const randomGroup = Math.random() > 0.5 ? logos1 : logos2;
        setSelectedLogos(randomGroup);
    }, []);

    return (
        <div>
            <div className={styles.text}>
                오늘은 어떤 주식을 받을 수 있을까요?
            </div>
            <p className={styles.subtitle}>다양한 브랜드의 주식을 받아보세요!</p>
            <div className={styles.container}>
                {selectedLogos.map((logo, index) => (
                    <div
                        key={index}
                        className={styles.logo}
                        style={{
                            backgroundImage: `url(${logo})`,
                            animationDelay: `${-6 + index * 2}s`,
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}
