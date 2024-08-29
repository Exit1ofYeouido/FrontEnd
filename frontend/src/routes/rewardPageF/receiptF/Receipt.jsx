import React, { useRef, useState } from "react";
import axios from "axios";
import styles from "./Receipt.module.css";
import Navbar from "~components/Navbar";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

export default function Receipt() {
    const location = useLocation();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            setSelectedFile(file);
        }
    };

    const handleUploadButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleImageSubmit = async () => {
        if (!selectedFile) {
            alert("먼저 이미지를 업로드해주세요.");
            return;
        }

        setIsSubmitting(true);

        
        const formData = new FormData();
        formData.append("receipt_img", selectedFile);

        try {
            const response = await axios.post(
                "https://your-api-endpoint.com/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                alert("이미지가 성공적으로 제출되었습니다!");
            } else {
                alert("이미지 제출에 실패했습니다.");
            }
        } catch (error) {
            console.error("이미지 제출 중 오류 발생:", error);
            alert("이미지를 제출하는 동안 오류가 발생했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.topBar}>
                    <div className={styles.arrow} onClick={handleBack}>
                        <IoIosArrowBack />
                    </div>
                    <div>영수증 인증</div>
                </div>
                <div
                    className={styles.content}
                    onClick={handleUploadButtonClick}
                    style={{ cursor: "pointer" }}
                >
                    {uploadedImage ? (
                        <img
                            src={uploadedImage}
                            alt="Captured"
                            className={styles.imagePreview}
                        />
                    ) : (
                        <div>
                            <div>사진을 업로드 해주세요.</div>
                            <div>업로드 하기</div>
                        </div>
                    )}
                </div>
                <div className={styles.bottomBar}>
                    <input
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleFileUpload}
                        ref={fileInputRef}
                        style={{ display: "none" }}
                    />
                    <button
                        onClick={handleImageSubmit}
                        className={styles.submitButton}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "제출 중..." : "사진 제출"}
                    </button>
                </div>
            </div>
            <Navbar />
        </div>
    );
}
