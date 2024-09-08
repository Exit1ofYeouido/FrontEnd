import React, { useState, useEffect } from "react";
import styles from "./Attendance.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import Navbar from "~components/Navbar";
import Modal from "./AttendanceModal";
import { useNavigate } from "react-router-dom";
import { attendance, attendanceCheck } from "~apis/rewardAPI/attendanceApi";
const S3_BASE_URL =
    "https://stock-craft.s3.ap-northeast-2.amazonaws.com/attendance/";
const complete = `${S3_BASE_URL}complete.svg`;
const images = Array.from(
    { length: 25 },
    (_, i) => `${S3_BASE_URL}day${i + 1}.svg`
);

export default function Attendance() {
    const [month, setMonth] = useState(0);
    const [attendCount, setAttendCount] = useState(0);
    const [company, setCompany] = useState("");
    const [amount, setAmount] = useState(0.0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const data = await attendance();
                setMonth(data.month);
                setAttendCount(data.attendCount);
                setIsButtonDisabled(data.checked);
            } catch (error) {
                console.error("Error fetching attendance:", error);
            }
        };

        fetchAttendance();
    }, []);

    const handleAttendance = async () => {
        try {
            const data = await attendanceCheck();
            setAttendCount((prevCount) => prevCount + 1);
            setIsButtonDisabled(true);
            if (data.hasReward) {
                setCompany(data.reward.enterpriseName);
                setAmount(data.reward.amount);
                setShowModal(true);
            }
        } catch (error) {
            console.error("Error submitting attendance:", error);
        }
    };

    const handlePrevious = () => {
        navigate("/reward");
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const goCompany = () => {
        setShowModal(false);
        navigate("/reward/video");
    };

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={styles.content}
            >
                <div className={styles.container}>
                    <div className={styles.topBar}>
                        <IoIosArrowBack
                            className={styles.backIcon}
                            onClick={handlePrevious}
                        />
                    </div>
                    <div className={styles.attendanceTitle}>
                        25일동안 5일마다 출석하면
                        <br /> 주식을 드려요!
                    </div>

                    <div className={styles.attendanceBox}>
                        <span className={styles.attendanceMonth}>
                            {month}월 출석일
                        </span>
                        &nbsp;
                        <span className={styles.attendanceDay}>
                            {attendCount}일
                        </span>
                    </div>

                    <div className={styles.calendarWrapper}>
                        <div className={styles.calendar}>
                            {images.map((image, index) => (
                                <motion.div
                                    key={index}
                                    className={styles.day}
                                    animate={
                                        index === attendCount - 1
                                            ? {
                                                  scale: [1, 1.2, 1],
                                                  rotate: [0, 10, -10, 0],
                                              }
                                            : {}
                                    }
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <img
                                        src={
                                            index < attendCount
                                                ? complete
                                                : image
                                        }
                                        alt={`Day ${index + 1}`}
                                        className={styles.dayImage}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.button
                        className={styles.attendanceButton}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAttendance}
                        disabled={isButtonDisabled}
                    >
                        {isButtonDisabled ? "출석완료" : "출석하기"}
                    </motion.button>
                </div>
            </motion.div>
            {showModal && (
                <Modal
                    onClose={handleCloseModal}
                    company={company}
                    amount={amount}
                    goCompany={goCompany}
                />
            )}
            <Navbar />
        </div>
    );
}
