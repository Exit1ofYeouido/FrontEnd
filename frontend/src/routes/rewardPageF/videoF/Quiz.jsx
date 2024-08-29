import React, { useState, useEffect } from "react";
import styles from "./Quiz.module.css";
import { motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa6";
import axios from "axios";
import Modal from "./QuizModal";
import { useNavigate } from "react-router-dom";

export default function Quiz({ onClose, mediaId, enterpriseName }) {
    const [answer, setAnswer] = useState(0);
    const [question, setQuestion] = useState("");
    const [quizSectionList, setQuizSectionList] = useState([]);
    const [amount, setAmount] = useState(0.0);
    const [showModal, setShowModal] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizData = async () => {
            const response = await axios.get(`/api/ad/${mediaId}/quiz`);
            if (response && response.data) {
                setAnswer(response.data.answer);
                setQuestion(response.data.question);
                setQuizSectionList(response.data.quizSectionList);
            } else {
                console.error("Fail");
            }
        };
        fetchQuizData();
    }, [mediaId]);

    const getStock = async () => {
        const response = await axios.post(
            `/api/ad/${mediaId}/quiz`,
            {
                enterpriseName: enterpriseName,
            },
            {
                headers: {
                    memberId: 1,
                },
            }
        );

        if (response && response.data) {
            setAmount(response.data.amount);
            setShowModal(true);
            setIsCorrect(true);
        } else {
            console.error("Fail");
        }
    };

    const handleOptionClick = (selectedOptionIndex) => {
        if (selectedOptionIndex === answer) {
            getStock();
        } else {
            setIsCorrect(false);
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
    }

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
                            className={styles.select}
                            onClick={() => handleOptionClick(index + 1)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            </motion.div>
            {showModal && (
                <Modal
                    onClose={closeModal}
                    enterpriseName={enterpriseName}
                    amount={amount}
                    isCorrect={isCorrect}
                    goVideo={goVideo}
                    goCompany={goCompany}
                />
            )}
        </>
    );
}
