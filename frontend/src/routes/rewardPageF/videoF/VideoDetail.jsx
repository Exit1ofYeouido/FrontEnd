import React from "react";
import YouTube from "react-youtube";
import styles from "./VideoDetail.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Navbar from "~components/Navbar";

export default function VideoDetail() {
    const navigate = useNavigate();
    const videoId = "Xd8zr5exbKw";

    const videoOptions = {
        playerVars: {
            autoplay: 1,
            rel: 0,
            modestbranding: 1,
            controls: 0,
            // loop: 1,
            // playlist: videoId,
        },
    };

    const handleVideoEnd = (e) => {
        e.target.stopVideo(0);
    };

    const handleBack = () => {
        navigate("/reward/video");
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.topBar}>
                    <div className={styles.arrow} onClick={handleBack}>
                        <IoIosArrowBack />
                    </div>
                </div>
                <div className={styles.videoWrapper}>
                    <YouTube
                        videoId={videoId}
                        opts={videoOptions}
                        onEnd={handleVideoEnd}
                        className={styles.videoPlayer}
                    />
                </div>
            </div>
            {/* <Navbar/> */}
        </>
    );
}
