import React, { useState, useEffect } from "react";
import styles from "./Attendance.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import Navbar from "~components/Navbar";
import Modal from "./AttendanceModal";
import { useNavigate } from "react-router-dom";
import { attendance, attendanceCheck } from "~apis/rewardAPI/attendanceApi";
import day1 from "~assets/attendance/day1.svg";
import day2 from "~assets/attendance/day2.svg";
import day3 from "~assets/attendance/day3.svg";
import day4 from "~assets/attendance/day4.svg";
import day5 from "~assets/attendance/day5.svg";
import day6 from "~assets/attendance/day6.svg";
import day7 from "~assets/attendance/day7.svg";
import day8 from "~assets/attendance/day8.svg";
import day9 from "~assets/attendance/day9.svg";
import day10 from "~assets/attendance/day10.svg";
import day11 from "~assets/attendance/day11.svg";
import day12 from "~assets/attendance/day12.svg";
import day13 from "~assets/attendance/day13.svg";
import day14 from "~assets/attendance/day14.svg";
import day15 from "~assets/attendance/day15.svg";
import day16 from "~assets/attendance/day16.svg";
import day17 from "~assets/attendance/day17.svg";
import day18 from "~assets/attendance/day18.svg";
import day19 from "~assets/attendance/day19.svg";
import day20 from "~assets/attendance/day20.svg";
import day21 from "~assets/attendance/day21.svg";
import day22 from "~assets/attendance/day22.svg";
import day23 from "~assets/attendance/day23.svg";
import day24 from "~assets/attendance/day24.svg";
import day25 from "~assets/attendance/day25.svg";
import complete from "~assets/attendance/complete.svg";

const images = [
    day1,
    day2,
    day3,
    day4,
    day5,
    day6,
    day7,
    day8,
    day9,
    day10,
    day11,
    day12,
    day13,
    day14,
    day15,
    day16,
    day17,
    day18,
    day19,
    day20,
    day21,
    day22,
    day23,
    day24,
    day25,
];

export default function Attendance() {
    const [month, setMonth] = useState(0);
    const [attendCount, setAttendCount] = useState(0);
    const [company, setCompany] = useState("");
    const [stockCode, setStockCode] = useState("");
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
                setStockCode(data.reward.stockCode);
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
                        출석 체크 5일마다 랜덤 주식을 드려요!
                        <br /> (최대 25일)
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
                        {isButtonDisabled ? "출석완료" : "출석체크"}
                    </motion.button>
                </div>
            </motion.div>
            {showModal && (
                <Modal
                    onClose={handleCloseModal}
                    company={company}
                    amount={amount}
                    stockCode={stockCode}
                />
            )}
            <Navbar />
        </div>
    );
}
