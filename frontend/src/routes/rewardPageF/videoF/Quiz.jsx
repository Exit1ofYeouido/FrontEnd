import React, { useState, useEffect } from "react";
import styles from "./Quiz.module.css";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import Modal from "./QuizModal";

export default function Quiz({ onClose, mediaId, enterpriseName }) {
    const [answer, setAnswer] = useState(0);
    const [question, setQuestion] = useState("");
    const [quizSectionList, setQuizSectionList] = useState([]);
    const [amount, setAmount] = useState(0.000000);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchVideos = async () => {
            const response = await axios.get(`/api/ad/${mediaId}/quiz`);
            console.log(mediaId);
            if (response && response.data) {
                setAnswer(response.data.answer);
                setQuestion(response.data.question);
                setQuizSectionList(response.data.quizSectionList);
            } else {
                console.error("Fail");
            }
        };
        fetchVideos();
    }, []);

    const getStock = async () => {
        const response = await axios.post(`/api/ad/${mediaId}/quiz`, {
            enterpriseName: enterpriseName,
        });

        if (response && response.data) {
            setAmount(response.data.amount);
            setShowModal(true);
        } else {
            console.error("Fail");
        }
    };

    const handleOptionClick = (selectedOptionIndex) => {
        if (selectedOptionIndex === answer) {
            getStock();
        } else {
            setShowModal(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
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
                    <IoMdClose />
                </div>
                <div className={styles.question}>{question}</div>

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
                />
            )}
        </>
    );
}
