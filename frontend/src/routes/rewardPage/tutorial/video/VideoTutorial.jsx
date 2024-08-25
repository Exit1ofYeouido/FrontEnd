import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
    const [isFirstRender, setIsFirstRender] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setIsFirstRender(false);
    }, []);

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const handleSkip = () => {
        navigate("/reward/video");
    };

    const variants = {
        enter: {
            x: 300,
            opacity: 0,
        },
        center: {
            x: 0,
            opacity: 1,
        },
        exit: {
            x: -300,
            opacity: 0,
        },
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

            <motion.div
                className={styles.slide}
                key={currentSlide}
                variants={variants}
                initial={isFirstRender && currentSlide === 0 ? false : "enter"}
                animate="center"
                exit="exit"
                transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                }}
            >
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
            </motion.div>

            <div className={styles.controls}>
                {currentSlide >= 0 && (
                    <div onClick={handleSkip} className={styles.button}>
                        하룻동안 보지 않기
                    </div>
                )}
                {currentSlide < slides.length - 1 ? (
                    <div onClick={handleNext} className={styles.button}>
                        다음
                    </div>
                ) : (
                    <div className={styles.button} onClick={handleSkip}>
                        영상 보러 가기
                    </div>
                )}
            </div>
        </div>
    );
}
