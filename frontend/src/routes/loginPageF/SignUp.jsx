import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./SignUp.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Toast, { showToast } from "~components/Toast";

export default function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        clearErrors,
    } = useForm({
        shouldFocusError: false,
    });
    const [step, setStep] = useState(1);
    const [shakeKey, setShakeKey] = useState(0);
    const [isIdChecked, setIsIdChecked] = useState(false);
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const navigate = useNavigate();

    const handleNextStep = async () => {
        const result = await trigger([
            "id",
            "password",
            "name",
            "birthdate",
            "genderDigit",
            "phone",
            "phoneVerification",
            "email",
        ]);

        if (!result) {
            setShakeKey((prev) => prev + 1);
        } else {
            if (step === 1) {
                if (!isIdChecked) {
                    showToast("error", "아이디 중복 검사를 해야 합니다.");
                } else if (result) {
                    setStep(2);
                } else {
                    setShakeKey((prev) => prev + 1);
                }
            } else if (step === 2) {
                if (!isPhoneVerified) {
                    showToast('error', '휴대폰 인증을 완료해야 합니다.');
                } else if (result) {
                    setStep(3);
                } else {
                    setShakeKey((prev) => prev + 1);
                }
            }
        }
    };

    const handlePrevStep = () => {
        setStep(1);
    };

    const onSubmitSignUp = (data) => {
        console.log(data);
    };

    const shakeAnimation = {
        x: [0, -5, 5, -5, 5, 0],
        transition: { duration: 0.3, ease: "easeInOut" },
    };

    const handleInputChange = (fieldName) => {
        if (errors[fieldName]) {
            clearErrors(fieldName);
        }
    };

    const checkId = () => {
        const isValidId = true;
        if (isValidId) {
            setIsIdChecked(true);
            showToast("success", "아이디가 사용 가능합니다.");
        } else {
            setIsIdChecked(false);
            showToast('error', '아이디가 중복되었습니다.');
        }
    };

    const verifyPhone = () => {
        const isVerified = true;
        if (isVerified) {
            setIsPhoneVerified(true);
            showToast('success', '휴대폰 인증이 완료되었습니다.');
        } else {
            setIsPhoneVerified(false);
            showToast('error', '휴대폰 인증에 실패했습니다.');
        }
    };

    return (
        <div className={styles.signUpWrapper}>
            <Toast />
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className={styles.formContainer}
                    >
                        <div className={styles.signupText}>
                            <IoIosArrowBack
                                className={styles.backIcon}
                                onClick={() => navigate("/login")}
                            />
                            <div>계정 소유자 정보를 입력해주세요</div>
                        </div>
                        <br />
                        <form>
                            <motion.div
                                key={`id-${shakeKey}`}
                                className={`${styles.idForm} ${
                                    errors.id ? styles.inputError : ""
                                }`}
                                animate={errors.id ? shakeAnimation : {}}
                            >
                                <div className={styles.idInfoText}>아이디</div>
                                <div className={styles.idInputGroup}>
                                    <input
                                        type="text"
                                        placeholder="아이디 입력"
                                        {...register("id", { required: true })}
                                        className={styles.idInput}
                                        onChange={() => handleInputChange("id")}
                                    />
                                    <button
                                        type="button"
                                        className={styles.idCheckButton}
                                        onClick={checkId}
                                    >
                                        중복 검사
                                    </button>
                                </div>
                            </motion.div>
                            <motion.div
                                key={`password-${shakeKey}`}
                                className={`${styles.passwordForm} ${
                                    errors.password ? styles.inputError : ""
                                }`}
                                animate={errors.password ? shakeAnimation : {}}
                            >
                                <div className={styles.pwInfoText}>
                                    비밀번호
                                </div>
                                <input
                                    type="password"
                                    placeholder="비밀번호 입력"
                                    {...register("password", {
                                        required: true,
                                    })}
                                    className={styles.pwInput}
                                    onChange={() =>
                                        handleInputChange("password")
                                    }
                                />
                            </motion.div>
                            <motion.div
                                key={`name-${shakeKey}`}
                                className={`${styles.name} ${
                                    errors.name ? styles.inputError : ""
                                }`}
                                animate={errors.name ? shakeAnimation : {}}
                            >
                                <div>
                                    <div className={styles.nameInfoText}>
                                        이름
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="이름 입력"
                                        {...register("name", {
                                            required: true,
                                        })}
                                        className={styles.nameInput}
                                        onChange={() =>
                                            handleInputChange("name")
                                        }
                                    />
                                </div>
                            </motion.div>
                            <motion.div
                                key={`birth-${shakeKey}`}
                                className={`${styles.birth} ${
                                    errors.birthdate || errors.genderDigit
                                        ? styles.inputError
                                        : ""
                                }`}
                                animate={
                                    errors.birthdate || errors.genderDigit
                                        ? shakeAnimation
                                        : {}
                                }
                            >
                                <div>
                                    <div className={styles.birthInfoText}>
                                        주민등록 앞 7자리
                                    </div>
                                    <div className={styles.birthGender}>
                                        <input
                                            type="text"
                                            placeholder="생년월일"
                                            {...register("birthdate", {
                                                required:
                                                    "생년월일 6자리를 입력해주세요.",
                                                pattern: {
                                                    value: /^\d{6}$/,
                                                    message:
                                                        "6자리 숫자를 입력해주세요.",
                                                },
                                            })}
                                            maxLength={6}
                                            className={styles.birthInput}
                                            onChange={() =>
                                                handleInputChange("birthdate")
                                            }
                                        />
                                        <div className={styles.dod}>-</div>
                                        <input
                                            type="text"
                                            placeholder="0"
                                            {...register("genderDigit", {
                                                required:
                                                    "성별 코드 1자리를 입력해주세요.",
                                                pattern: {
                                                    value: /^[1-4]$/,
                                                    message:
                                                        "1에서 4 사이의 숫자를 입력해주세요.",
                                                },
                                            })}
                                            maxLength={1}
                                            className={styles.genderInput}
                                            onChange={() =>
                                                handleInputChange("genderDigit")
                                            }
                                        />
                                        <div className={styles.maskedValue}>
                                            <span className={styles.maskedDot}>
                                                ●
                                            </span>
                                            <span className={styles.maskedDot}>
                                                ●
                                            </span>
                                            <span className={styles.maskedDot}>
                                                ●
                                            </span>
                                            <span className={styles.maskedDot}>
                                                ●
                                            </span>
                                            <span className={styles.maskedDot}>
                                                ●
                                            </span>
                                            <span className={styles.maskedDot}>
                                                ●
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                            <div className={styles.buttonGroup}>
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    className={styles.nextButton}
                                >
                                    다음
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ x: "480px", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100vw", opacity: 0 }}
                        transition={{ duration: 0, ease: "easeInOut" }}
                        className={styles.formContainer}
                    >
                        <div className={styles.signupText}>
                            <IoIosArrowBack
                                className={styles.backIcon}
                                onClick={() => navigate("/login")}
                            />
                            <div>계정 소유자 정보를 입력해주세요</div>
                        </div>
                        <br />
                        <form onSubmit={handleSubmit(onSubmitSignUp)}>
                            <motion.div
                                key={`phone-${shakeKey}`}
                                className={`${styles.authInputGroup} ${
                                    errors.phone ? styles.inputError : ""
                                }`}
                                animate={errors.phone ? shakeAnimation : {}}
                            >
                                <div className={styles.phoneInfoText}>
                                    휴대 전화번호
                                </div>
                                <div className={styles.phoneInputGroup}>
                                    <input
                                        type="text"
                                        placeholder="01012345678"
                                        {...register("phone", {
                                            required: true,
                                        })}
                                        className={styles.phoneInput}
                                        onChange={() =>
                                            handleInputChange("phone")
                                        }
                                    />
                                    <button
                                        type="button"
                                        className={styles.authButton}
                                        onClick={verifyPhone}
                                    >
                                        인증 받기
                                    </button>
                                </div>
                            </motion.div>
                            <motion.div
                                key={`phoneVerification-${shakeKey}`}
                                className={`${styles.authInputGroup} ${
                                    errors.phoneVerification
                                        ? styles.inputError
                                        : ""
                                }`}
                                animate={
                                    errors.phoneVerification
                                        ? shakeAnimation
                                        : {}
                                }
                            >
                                <div className={styles.phoneVerificationGroup}>
                                    <input
                                        type="text"
                                        className={styles.authCheckInput}
                                        {...register("phoneVerification", {
                                            required: true,
                                        })}
                                        onChange={() =>
                                            handleInputChange(
                                                "phoneVerification"
                                            )
                                        }
                                    />
                                    <button
                                        type="button"
                                        className={styles.authCheckButton}
                                    >
                                        인증 확인
                                    </button>
                                </div>
                            </motion.div>
                            <motion.div
                                key={`email-${shakeKey}`}
                                className={`${styles.authInputGroup} ${
                                    errors.email ? styles.inputError : ""
                                }`}
                                animate={errors.email ? shakeAnimation : {}}
                            >
                                <div className={styles.emailInfoText}>
                                    이메일
                                </div>
                                <input
                                    type="email"
                                    placeholder="stockcraft@pda.com"
                                    {...register("email", { required: true })}
                                    className={styles.emailInput}
                                    onChange={() => handleInputChange("email")}
                                />
                            </motion.div>
                            <div className={styles.buttonGroup}>
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className={styles.previousButton}
                                >
                                    이전
                                </button>
                                <button
                                    type="submit"
                                    className={styles.signupButton}
                                    onClick={handleNextStep}
                                >
                                    회원가입
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
