import React, { useState } from "react";
import styles from "./ReceiptTutorial.module.css";
import { useNavigate } from "react-router-dom";
import shot1 from "~assets/tutorial/receipt/shot1.svg";
import shot2 from "~assets/tutorial/receipt/shot2.svg";
import shot3 from "~assets/tutorial/receipt/shot3.svg";
import shot4 from "~assets/tutorial/receipt/shot4.svg";
import { IoIosArrowBack } from "react-icons/io";

const slides = [
    {
        id: 1,
        icon: shot1,
        description: (
            <>
                좋아하는 브랜드의 물품을 <br />
                구매해보세요
            </>
        ),
    },
    {
        id: 2,
        icon: shot2,
        description: (
            <>
                물품을 구매하고 <br />
                영수증을 사진으로 찍어 보세요
            </>
        ),
    },
    {
        id: 3,
        icon: shot3,
        description: (
            <>
                찍은 영수증을 <br />
                업로드 해보세요
            </>
        ),
    },
    {
        id: 4,
        icon: shot4,
        description: (
            <>
                해당 기업의 주식을 <br />
                받아보세요
            </>
        ),
    },
];

export default function ReceiptTutorial() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const handlePrevious = () => {
        navigate("/reward/receipt");
    };

    return (
        <div className={styles.container}>
            <div className={styles.topBar}>
                <div
                    className={styles.arrow}
                    onClick={() => navigate("/reward")}
                >
                    <IoIosArrowBack />
                </div>
                <div>영수증 인증</div>
            </div>

            <div className={styles.slide}>
                <div className={styles.iconWrapper}>
                    <img
                        src={slides[currentSlide].icon}
                        alt="Slide Icon"
                        className={styles.icon}
                    />
                </div>
                <div className={styles.textWrapper}>
                    <div className={styles.description}>
                        {slides[currentSlide].description}
                    </div>
                </div>
            </div>

            <div className={styles.controls}>
                {currentSlide >= 0 && (
                    <div onClick={handlePrevious} className={styles.button}>
                        하룻동안 보지 않기
                    </div>
                )}
                {currentSlide < slides.length - 1 ? (
                    <div onClick={handleNext} className={styles.button}>
                        다음
                    </div>
                ) : (
                    <div className={styles.button} onClick={handlePrevious}>
                        영수증 인증 하기
                    </div>
                )}
            </div>
        </div>
    );
}
