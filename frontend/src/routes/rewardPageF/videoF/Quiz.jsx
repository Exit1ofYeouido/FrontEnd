import React, { useState, useEffect } from "react";
import styles from "./Quiz.module.css";
import { motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa6";
import Modal from "./QuizModal";
import { useNavigate } from "react-router-dom";
import { quizListApi, quizCorrectApi } from "~apis/rewardAPI/quizApi";
import Lottie from "lottie-react";
import errorAnimation from "~assets/reward/wrong.json";
import correctAnimation from "~assets/reward/correct.json";

export default function Quiz({ onClose, mediaId, enterpriseName }) {
    const [answer, setAnswer] = useState(0);
    const [question, setQuestion] = useState("");
    const [quizSectionList, setQuizSectionList] = useState([]);
    const [amount, setAmount] = useState(0.0);
    const [showModal, setShowModal] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [showErrorAnimation, setShowErrorAnimation] = useState(false);
    const [showCorrectAnimation, setShowCorrectAnimation] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const data = await quizListApi(mediaId);
                console.log(data.answer);
                setAnswer(data.answer);
                setQuestion(data.question);
                setQuizSectionList(data.quizSectionList);
            } catch (error) {
                console.error("Failed to fetch quiz data:", error);
            }
        };
        fetchQuizData();
    }, [mediaId]);

    const handleOptionClick = async (selectedOptionIndex) => {
        setSelectedOption(selectedOptionIndex);
        if (selectedOptionIndex === answer) {
            try {
                const data = await quizCorrectApi(mediaId, enterpriseName);
                setAmount(data.amount);
                setShowCorrectAnimation(true);
                setIsCorrect(true);
            } catch (error) {
                console.error("Failed to submit quiz answer:", error);
                setIsCorrect(false);
            }
        } else {
            setShowErrorAnimation(true);
        }
        setTimeout(() => {
            setSelectedOption(null);
            setShowErrorAnimation(false);
            setShowCorrectAnimation(false);
            if (isCorrect) {
                setShowModal(true);
            }
        }, 1500);
    };

    const handleAnimationComplete = () => {
        setShowErrorAnimation(false);
        setShowCorrectAnimation(false);
        if (isCorrect) {
            setShowModal(true);
        }
    };

    const goVideo = () => {
        setShowModal(false);
        navigate("/reward/video");
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const goCompany = () => {
        setShowModal(false);
        navigate("/reward/video");
    };

    return (
        <>
            <motion.div
                initial={{ y: "0%", opacity: 1 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className={styles.container}
            >
                <div className={styles.closeButton} onClick={onClose}>
                    <FaAngleDown />
                </div>
                <div className={styles.question}>Q. {question}</div>

                <div className={styles.selection}>
                    {quizSectionList.map((option, index) => (
                        <div
                            key={index + 1}
                            className={`${styles.select} ${
                                selectedOption === index + 1
                                    ? isCorrect
                                        ? styles.correct
                                        : styles.incorrect
                                    : ""
                            }`}
                            onClick={() => handleOptionClick(index + 1)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            </motion.div>
            {showErrorAnimation && (
                <div className={styles.errorAnimation}>
                    <div className={styles.animationContent}>
                        <Lottie
                            animationData={errorAnimation}
                            loop={false}
                            speed={1}
                        />
                        <p>오답입니다. 다시 시도해보세요!</p>
                    </div>
                </div>
            )}
            {showCorrectAnimation && (
                <div className={styles.correctAnimation}>
                    <div className={styles.animationContent}>
                        <Lottie
                            animationData={correctAnimation}
                            loop={false}
                            speed={0.5}
                        />
                        <p>정답입니다! 축하합니다!</p>
                    </div>
                </div>
            )}
            {showModal && (
                <Modal
                    onClose={closeModal}
                    enterpriseName={enterpriseName}
                    amount={amount}
                    goVideo={goVideo}
                    goCompany={goCompany}
                />
            )}
        </>
    );
}