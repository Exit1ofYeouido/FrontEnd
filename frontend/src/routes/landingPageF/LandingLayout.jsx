import React, { useMemo } from "react";
import { Outlet } from "react-router-dom";
import styles from "./LandingLayout.module.css";

const COIN_COUNT = 50;

export default function LandingLayout() {
    const coins = useMemo(() => {
        return Array.from({ length: COIN_COUNT }, (_, index) => ({
            size: Math.random() * 30 + 15, // 20px to 40px
            left: `${Math.random() * 98 + 1}%`, // 5% to 95% from left
            duration: Math.random() * 3 + 3, // 2 to 5 seconds
            delay: Math.random() * 5, // 0 to 5 seconds delay
            bottom: `${Math.random() * 7}%`, // Final resting position: 0% to 10% from bottom
        }));
    }, []);

    return (
        <div className={styles.layoutWrapper}>
            <div className={styles.layout}>
                {coins.map((coin, index) => (
                    <div
                        key={index}
                        className={styles.animatedElement}
                        style={{
                            width: `${coin.size}px`,
                            height: `${coin.size}px`,
                            left: coin.left,
                            animationDuration: `${coin.duration}s`,
                            animationDelay: `${coin.delay}s`,
                            bottom: coin.bottom,
                        }}
                    >
                        <div className={styles.coinFront} style={{ fontSize: `${coin.size * 0.6}px` }}>₩</div>
                        <div className={styles.coinBack} style={{ fontSize: `${coin.size * 0.6}px` }}>₩</div>
                    </div>
                ))}
                <Outlet/>
            </div>
        </div>
    );
}