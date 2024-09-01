import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./ReceiptTutorial.module.css";
import { useNavigate, useLocation } from "react-router-dom";
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

    const handleSkip = () => {
        navigate("/reward/receipt");
    };

    const handleBack = () => {
        if (location.state && location.state.from) {
            navigate(`/${location.state.from}`);
        } else {
            navigate("/reward");
        }
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
                    <div>영수증 인증</div>
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
                        <div onClick={handleSkip} className={styles.button}>
                            영수증 인증 해볼까요?
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
