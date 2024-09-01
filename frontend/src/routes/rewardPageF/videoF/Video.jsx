import React, { useEffect, useState } from "react";
import styles from "./Video.module.css";
import { IoIosArrowBack } from "react-icons/io";
import Navbar from "~components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { videoListApi } from "~apis/rewardAPI/videoApi";
import { motion } from "framer-motion";

export default function Video() {
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const loadVideos = async () => {
            try {
                const videoData = await videoListApi();
                setVideos(videoData);
            } catch (error) {
                console.error("Failed to load videos:", error);
            }
        };

        loadVideos();
    }, []);

    const handleVideoClick = (video) => {
        navigate("/reward/videodetail", { state: { video } });
    };

    const handleBack = () => {
        if (location.state && location.state.from) {
            navigate(`/${location.state.from}`);
        } else {
            navigate("/reward");
        }
    };

    return (
        <>
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

                    <div className={styles.total}>총 {videos.length}건</div>

                    <div className={styles.videoList}>
                        {videos.map((video) => (
                            <div
                                key={video.mediaId}
                                className={styles.videoCard}
                                onClick={() => handleVideoClick(video)}
                            >
                                <div className={styles.thumbnailContainer}>
                                    <img
                                        src={video.thumbnail}
                                        alt={video.videoName}
                                        className={styles.thumbnail}
                                    />
                                </div>
                                <div className={styles.videoInfo}>
                                    <img
                                        src={`https://stock-craft.s3.ap-northeast-2.amazonaws.com/logos/${encodeURIComponent(
                                            video.name
                                        )}.svg`}
                                        alt={`${video.name} logo`}
                                        className={styles.logo}
                                    />
                                    <div className={styles.textContainer}>
                                        <div className={styles.videoName}>
                                            {video.thumbnailName}
                                        </div>
                                        <div className={styles.name}>
                                            {video.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
            <Navbar />
        </>
    );
}
