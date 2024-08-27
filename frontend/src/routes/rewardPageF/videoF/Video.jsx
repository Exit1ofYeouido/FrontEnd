import React, { useEffect, useState } from "react";
import styles from "./Video.module.css";
import { IoIosArrowBack } from "react-icons/io";
import Navbar from "~components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Video() {
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();

    const dummyData = [
        {
            mediaId: 1,
            name: "이엠텍",
            videoName: "이엠텍의 반란 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
            thumbnail:
                "https://cdn.e2news.com/news/photo/201808/201645_61210_418.jpg",
        },
        {
            mediaId: 2,
            name: "이엠텍",
            videoName: "이엠텍 사고 경제적 자유 얻는 방법",
            thumbnail: "https://i.ytimg.com/vi/LT96AKZDb3s/maxresdefault.jpg",
        },
        {
            mediaId: 3,
            name: "이엠텍",
            videoName: "이엠텍 사고 경제적 자유 얻는 방법",
            thumbnail: "https://i.ytimg.com/vi/LT96AKZDb3s/maxresdefault.jpg",
        },
        {
            mediaId: 4,
            name: "이엠텍",
            videoName: "이엠텍 사고 경제적 자유 얻는 방법",
            thumbnail: "https://i.ytimg.com/vi/LT96AKZDb3s/maxresdefault.jpg",
        },
    ];

    useEffect(() => {
        setVideos(dummyData);
    }, []);

    const handleVideoClick = (video) => {
        navigate("/reward/videodetail", { state: { video } });
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.topBar}>
                    <div className={styles.arrow}>
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
                                        {video.videoName}
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
            <Navbar />
        </>
    );
}
