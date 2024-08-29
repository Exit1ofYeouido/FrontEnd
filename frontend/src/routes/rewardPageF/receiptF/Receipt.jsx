import React, { useRef, useState } from "react";
import styles from "./Receipt.module.css";
import Navbar from "~components/Navbar";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-modal";

export default function Receipt() {
    const location = useLocation();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);

    const handleBack = () => {
        if (location.state && location.state.from) {
            navigate(`/${location.state.from}`);
        } else {
            navigate("/reward");
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUploadedImage(imageUrl);
        }
    };

    const handleUploadButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleCameraAccess = () => {
        setIsCameraModalOpen(true);
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
            })
            .catch((error) => {
                console.error("Error accessing camera:", error);
            });
    };

    const handleCapturePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageUrl = canvas.toDataURL("image/png");
        setUploadedImage(imageUrl);
        setIsCameraModalOpen(false);

        video.srcObject.getTracks().forEach((track) => track.stop());
    };

    return (
        <div className={styles.container}>
            <div className={styles.topBar}>
                <div className={styles.arrow} onClick={handleBack}>
                    <IoIosArrowBack />
                </div>
                <div>영수증 인증</div>
            </div>
            <div className={styles.content}>
                {uploadedImage ? (
                    <img
                        src={uploadedImage}
                        alt="Captured"
                        className={styles.imagePreview}
                    />
                ) : (
                    <div>사진을 업로드하거나 찍어주세요.</div>
                )}
            </div>
            <div className={styles.bottomBar}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                />
                <button
                    onClick={handleUploadButtonClick}
                    className={styles.uploadButton}
                >
                    파일 업로드
                </button>
                <button
                    onClick={handleCameraAccess}
                    className={styles.cameraButton}
                >
                    카메라 찍기
                </button>
            </div>
            <Navbar />

            <Modal
                isOpen={isCameraModalOpen}
                onRequestClose={() => setIsCameraModalOpen(false)}
                contentLabel="카메라"
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <video
                    ref={videoRef}
                    className={styles.videoPreview}
                    autoPlay
                />
                <button
                    onClick={handleCapturePhoto}
                    className={styles.captureButton}
                >
                    찍기
                </button>
                <canvas ref={canvasRef} style={{ display: "none" }} />
            </Modal>
        </div>
    );
}
