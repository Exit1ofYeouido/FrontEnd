import React, { useRef, useState } from "react";
import styles from "./Receipt.module.css";
import Navbar from "~components/Navbar";
import ReceiptGrid from "./ReceiptGrid";
import { IoIosArrowBack, IoMdCloudUpload } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { uploadReceipt, getReward } from "~apis/rewardAPI/receiptApi";
import Modal from "./ReceiptModal";
import Toast, { showToast } from "~components/Toast";
import ReceiptRewardModal from "./ReceiptRewardModal";
export default function Receipt() {
    const location = useLocation();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [receiptData, setReceiptData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
    const [rewardData, setRewardData] = useState(null);

    const handleBack = () => {
        if (location.state && location.state.from) {
            navigate(`/${location.state.from}`);
        } else {
            navigate("/reward");
        }
    };

    const handleFileUpload = (file) => {
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUploadedImage(imageUrl);
            setSelectedFile(file);
        }
    };

    const handleUploadButtonClick = () => {
        fileInputRef.current.click();
    };

    const keyTranslations = {
        storeName: "가게 이름",
        price: "금액",
        dealTime: "거래일시",
        approvalNum: "승인번호",
    };

    const handleImageSubmit = async () => {
        if (!selectedFile) {
            showToast("error", "먼저 이미지를 업로드해주세요.");
            return;
        }

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("receiptImg", selectedFile);

        try {
            const response = await uploadReceipt(formData);
            setReceiptData(response);
            setIsModalOpen(true);
            showToast("success", "이미지가 성공적으로 제출되었습니다!");
        } catch (error) {
            const status = error.response?.data?.status || "Unknown Status";
            const data = error.response?.data?.data?.missingValue || [];

            const translateKey = (key) => keyTranslations[key] || key;

            const dataString =
                Array.isArray(data) && data.length > 0
                    ? data.map((item) => translateKey(item)).join(", ")
                    : "No missing values";

            const message =
                error.response?.data?.message ||
                error.message ||
                "Unknown Error";

            if (status === 400) {
                showToast("error", message);
            } else if (status === 401) {
                showToast("error", message);
            } else if (status === 402) {
                showToast("error", message);
            } else if (status === 403) {
                showToast("error", message);
            } else if (status === 404) {
                showToast(
                    "error",
                    <div>
                        {message} <br />
                        누락정보 : {dataString}
                    </div>
                );
            } else if (status === 405) {
                showToast("error", message);
            } else {
                showToast("error", "message");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleConfirm = async () => {
        try {
            const receiptRequestData = {
                storeName: receiptData.storeName,
                price: receiptData.price,
                dealTime: receiptData.dealTime,
                approvalNum: receiptData.approvalNum,
                imgURL: receiptData.imgURL,
                enterpriseName: receiptData.enterpriseName,
            };

            const rewardResponse = await getReward(receiptRequestData);
            setIsModalOpen(false);

            setRewardData({
                company: rewardResponse.name,
                amount: rewardResponse.amount,
                stockCode: rewardResponse.stockCode,
            });
            setIsRewardModalOpen(true);
        } catch (error) {
            const status = error.response?.data?.status || "Unknown Status";
            const message =
                error.response?.data?.message ||
                error.message ||
                "Unknown Error";

            if (status === 406) {
                showToast("error", message);
            } else if (status === 407) {
                showToast("error", message);
            } else if (status === 408) {
                showToast("error", message);
            } else {
                showToast("error", message);
            }
        }
    };

    const closeRewardModal = () => {
        setIsRewardModalOpen(false);
        navigate("/reward/receipt");
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        showToast("error", "영수증 확인을 취소했습니다.");
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.topBar}>
                <div className={styles.arrow} onClick={handleBack}>
                    <IoIosArrowBack />
                </div>
                <div className={styles.title}>영수증 인증</div>
            </div>
            <div className={styles.contentWrapper}>
                <motion.div
                    className={styles.scrollableContent}
                    key="tuto-form"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <div className={styles.text}>
                        현재는 아래 브랜드만 가능해요
                    </div>
                    <ReceiptGrid />
                    <div className={styles.uploadSection}>
                        <div
                            className={`${styles.content} ${
                                dragActive ? styles.dragActive : ""
                            }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={handleUploadButtonClick}
                        >
                            {uploadedImage ? (
                                <img
                                    src={uploadedImage}
                                    alt="Captured"
                                    className={styles.imagePreview}
                                />
                            ) : (
                                <div className={styles.uploadPlaceholder}>
                                    <IoMdCloudUpload
                                        className={styles.uploadIcon}
                                    />
                                    <div>영수증 업로드 하기</div>
                                    <div>또는 여기로 파일을 드래그하세요</div>
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            accept="image/jpeg, image/png"
                            onChange={(e) =>
                                handleFileUpload(e.target.files[0])
                            }
                            ref={fileInputRef}
                            style={{ display: "none" }}
                        />
                        <button
                            onClick={handleImageSubmit}
                            className={`${styles.submitButton} ${
                                isSubmitting ? styles.submitting : ""
                            }`}
                            disabled={isSubmitting || !uploadedImage}
                        >
                            {isSubmitting ? "제출 중..." : "영수증 제출"}
                        </button>
                    </div>
                </motion.div>
            </div>
            {isModalOpen && (
                <Modal
                    receiptData={receiptData}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}

            {isRewardModalOpen && (
                <ReceiptRewardModal
                    onClose={closeRewardModal}
                    company={rewardData?.company}
                    amount={rewardData?.amount}
                    stockCode={rewardData?.stockCode}
                />
            )}
            <Navbar />
        </div>
    );
}
