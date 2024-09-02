import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./VideoTutorial.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import quiz from "~assets/tutorial/video/quiz.json";
import video from "~assets/tutorial/video/video.json";
import stock from "~assets/tutorial/video/stock.json";
import { IoIosArrowBack } from "react-icons/io";
import Lottie from "lottie-react";

const slides = [
    {
        id: 1,
        animationData: video,
        description: (
            <>
                원하는 영상을 선택 후 <br />
                영상을 시청하세요
            </>
        ),
    },
    {
        id: 2,
        animationData: quiz,
        description: <>영상에 대한 퀴즈를 풀어보세요</>,
    },
    {
        id: 3,
        animationData: stock,
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
    const location = useLocation();

    useEffect(() => {
        setIsFirstRender(false);
    }, []);

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const handleBack = () => {
        console.log(location.state.from);
        if (location.state && location.state.from) {
            navigate(`/${location.state.from}`);
        } else {
            navigate("/reward");
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
        <motion.div
            key="tuto-form"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <div className={styles.container}>
                <div className={styles.topBar}>
                    <div className={styles.arrow} onClick={handleBack}>
                        <IoIosArrowBack />
                    </div>
                    <div>기업 영상 시청</div>
                </div>

                <motion.div
                    className={styles.slide}
                    key={currentSlide}
                    variants={variants}
                    initial={
                        isFirstRender && currentSlide === 0 ? false : "enter"
                    }
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                    }}
                >
                    <div className={styles.iconWrapper}>
                        <Lottie
                            animationData={slides[currentSlide].animationData}
                            loop={true}
                            className={`${styles.icon} ${
                                currentSlide === 0
                                    ? styles.slide1
                                    : currentSlide === 1
                                    ? styles.slide2
                                    : styles.slide3
                            }`}
                        />
                    </div>
                    <div className={styles.textWrapper}>
                        <div className={styles.description}>
                            {slides[currentSlide].description}
                        </div>
                    </div>
                </motion.div>

                <div className={styles.controls}>
                    {!(
                        location.state && location.state.from == "home/useway"
                    ) &&
                        currentSlide >= 0 && (
                            <div onClick={handleSkip} className={styles.button}>
                                다시 보지 않기
                            </div>
                        )}
                    {currentSlide < slides.length - 1 ? (
                        <div onClick={handleNext} className={styles.button}>
                            다음
                        </div>
                    ) : (
                        <div className={styles.button} onClick={handleSkip}>
                            영상 보러 가볼까요?
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
