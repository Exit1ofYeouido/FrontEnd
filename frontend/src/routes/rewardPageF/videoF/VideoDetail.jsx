import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import styles from "./VideoDetail.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "~components/Navbar";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import Slider from "@mui/material/Slider";
import Quiz from "./Quiz";
import QuizReplayModal from "./QuizReplayModal";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function VideoDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const [videoId, setVideoId] = useState("");
    const [player, setPlayer] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(10);
    const [isSliderVisible, setIsSliderVisible] = useState(false);
    const [isQuizVisible, setIsQuizVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { video } = location.state || {};
    const videoOptions = {
        playerVars: {
            autoplay: 1,
            rel: 0,
            modestbranding: 1,
            controls: 0,
            wmode: "opaque",
        },
    };

    useEffect(() => {
        const fetchVideos = async () => {
            const response = await axios.get(`/api/ad/${video.mediaId}`);
            if (response && response.data) {
                setVideoId(response.data.uri);
            } else {
                console.error("Fail");
            }
        };
        fetchVideos();
    }, [video.mediaId]);

    const handleVideoReady = (event) => {
        const ytPlayer = event.target;
        ytPlayer.setVolume(volume);
        setPlayer(ytPlayer);
    };

    const handleVideoEnd = () => {
        setIsModalVisible(true);
    };

    const handleReplay = () => {
        player.seekTo(0);
        player.playVideo();
        setIsModalVisible(false);
    };

    const handleBack = () => {
        navigate("/reward/video");
    };

    const toggleMute = () => {
        if (isMuted) {
            player.unMute();
            setIsMuted(false);
        } else {
            player.mute();
            setIsMuted(true);
        }
    };

    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
        player.setVolume(newValue);
        if (newValue === 0) {
            setIsMuted(true);
        } else {
            setIsMuted(false);
        }
    };

    const handleMouseEnter = () => {
        setIsSliderVisible(true);
    };

    const handleMouseLeave = () => {
        setIsSliderVisible(false);
    };

    const handleQuizClick = () => {
        setIsQuizVisible(true);
        setIsModalVisible(false);
    };

    const handleClose = () => {
        setIsQuizVisible(false);
        setIsModalVisible(true);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.videoWrapper}>
                    <YouTube
                        videoId={videoId}
                        opts={videoOptions}
                        onReady={handleVideoReady}
                        onEnd={handleVideoEnd}
                        className={styles.videoPlayer}
                    />
                    <div className={styles.volumeControl}>
                        <div className={styles.arrow} onClick={handleBack}>
                            <IoIosArrowBack />
                        </div>
                        <div
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className={styles.volumeContainer}
                        >
                            <button
                                onClick={toggleMute}
                                className={styles.volumeButton}
                            >
                                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                            </button>
                            <div className={styles.sliderBack}>
                                {isSliderVisible && (
                                    <Slider
                                        value={volume}
                                        onChange={handleVolumeChange}
                                        aria-labelledby="continuous-slider"
                                        min={0}
                                        max={100}
                                        className={styles.volumeSlider}
                                        sx={{
                                            width: 100,
                                            color: "white",
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={styles.videoInfo}>
                        <div className={styles.companyInfo}>
                            <div className={styles.company}>
                                <img
                                    src={`https://stock-craft.s3.ap-northeast-2.amazonaws.com/logos/${encodeURIComponent(
                                        video.name
                                    )}.svg`}
                                    alt={`${video.name} logo`}
                                    className={styles.logo}
                                />
                                <div className={styles.name}>{video?.name}</div>
                            </div>
                            <div className={styles.videoName}>
                                {video?.thumbnailName}
                            </div>
                        </div>
                    </div>

                    <AnimatePresence>
                        {isQuizVisible && (
                            <motion.div
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: "100%", opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className={styles.quizContainer}
                            >
                                <Quiz
                                    onClose={handleClose}
                                    mediaId={video.mediaId}
                                    enterpriseName={video.name}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {isModalVisible && (
                        <QuizReplayModal
                            onQuiz={handleQuizClick}
                            onReplay={handleReplay}
                            onClose={() => setIsModalVisible(false)}
                        />
                    )}
                </div>
            </div>
            <Navbar />
        </>
    );
}
