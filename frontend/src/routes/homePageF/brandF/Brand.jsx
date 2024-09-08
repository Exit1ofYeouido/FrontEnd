import React, { useEffect, useState } from "react";
import styles from "./Brand.module.css";

import starbucks from "~assets/brand_logo/starbucks.svg";
import shinhan from "~assets/brand_logo/shinhan.svg";
import lg from "~assets/brand_logo/lg.svg";
import samsung from "~assets/brand_logo/samsung.svg";
import cocacola from "~assets/brand_logo/cocacola.svg";
import emtek from "~assets/brand_logo/emtek.svg";
import apple from "~assets/brand_logo/apple.svg";
import jls from "~assets/brand_logo/jls.svg";

const logos1 = [starbucks, cocacola, apple, shinhan];
const logos2 = [jls, emtek, samsung, lg];

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
            <p className={styles.subtitle}>이 브랜드들의 주식을 받아보세요!</p>
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
