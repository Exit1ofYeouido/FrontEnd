import React, { useState } from "react";
import styles from "./VideoTutorial.module.css";
import { useNavigate } from "react-router-dom";
import shot1 from "~assets/tutorial/video/shot1.svg";
import shot2 from "~assets/tutorial/video/shot2.svg";
import shot3 from "~assets/tutorial/video/shot3.svg";
import { IoIosArrowBack } from "react-icons/io";

const slides = [
    {
        id: 1,
        icon: shot1,
        description: (
            <>
                원하는 영상을 선택 후 <br />
                영상을 시청하세요
            </>
        ),
    },
    {
        id: 2,
        icon: shot2,
        description: (
            <>
                영상에 대한 퀴즈를 풀어보세요
            </>
        ),
    },
    {
        id: 3,
        icon: shot3,
        description: (
            <>
                해당 기업의 주식을 <br />
                받아보세요
            </>
        ),
    },
];

export default function VideoTutorial() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const handlePrevious = () => {
        navigate("/reward/video");
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
                <div>기업 영상 시청</div>
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
                        영상 보러 가기
                    </div>
                )}
            </div>
        </div>
    );
}
