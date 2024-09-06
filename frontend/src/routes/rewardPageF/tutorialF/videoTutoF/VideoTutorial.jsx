import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./VideoTutorial.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import quiz from "~assets/tutorial/video/quiz.json";
import video from "~assets/tutorial/video/video.json";
import stock from "~assets/tutorial/video/stock.json";
import { IoIosArrowBack } from "react-icons/io";
import Lottie from "lottie-react";
import { tutorialNoLook } from "~apis/myAPI/myApi";

const slides = [
    {
        id: 1,
        animationData: video,
        description: (
            <>
                보고 싶은 영상을 선택하신 후<br />
                영상을 시청하세요!
            </>
        ),
    },
    {
        id: 2,
        animationData: quiz,
        description: <>영상에 대한 퀴즈를 풀어보세요.</>,
    },
    {
        id: 3,
        animationData: stock,
        description: (
            <>
                해당 기업의 소수점 주식을 <br />
                받아보세요.
            </>
        ),
    },
];

export default function VideoTutorial() {
    const [type] = useState("광고");
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

    const handleNoLook = async () => {
        const result = await tutorialNoLook(type);
        navigate("/reward/video");
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
            initial={{opacity: 0, scale: 0.98}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 1}}
            transition={{duration: 0.5, ease: "easeInOut"}}
            className={styles.pageContainer}
        >
            <div className={styles.container}>
                <div className={styles.topBar}>
                    <motion.div
                        className={styles.arrow}
                        onClick={handleBack}
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                    >
                        <IoIosArrowBack/>
                    </motion.div>
                    <div className={styles.topBarTitle}>기업 영상 시청</div>
                </div>

                <motion.div
                    className={styles.slide}
                    key={currentSlide}
                    variants={variants}
                    initial={isFirstRender && currentSlide === 0 ? false : "enter"}
                    animate="center"
                    exit="exit"
                    transition={{
                        x: {type: "spring", stiffness: 300, damping: 30},
                        opacity: {duration: 0.2},
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
                        <motion.div
                            className={styles.description}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.2}}
                        >
                            {slides[currentSlide].description}
                        </motion.div>
                    </div>
                </motion.div>

                <div className={styles.progressBar}>
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`${styles.progressDot} ${index === currentSlide ? styles.active : ''}`}
                        />
                    ))}
                </div>

                <div className={styles.controls}>
                    {!(location.state && location.state.from == "home/useway") &&
                        currentSlide >= 0 && (
                            <motion.div
                                onClick={handleNoLook}
                                className={styles.button}
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                            >
                                다시 보지 않기
                            </motion.div>
                        )}
                    {currentSlide < slides.length - 1 ? (
                        <motion.div
                            onClick={handleNext}
                            className={`${styles.button} ${styles.primaryButton}`}
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                        >
                            다음
                        </motion.div>
                    ) : (
                        <motion.div
                            className={`${styles.button} ${styles.primaryButton}`}
                            onClick={handleSkip}
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                        >
                            영상 보러 가볼까요?
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
