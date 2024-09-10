import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./SignUp.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Toast, { showToast } from "~components/Toast";
import {
    idCheck,
    sendAuth,
    verifyCode,
    userSignUp,
} from "~apis/loginAPI/signup";

export default function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        clearErrors,
        setValue,
        getValues,
    } = useForm({
        shouldFocusError: false,
    });

    const [step, setStep] = useState(1);
    const [shakeKey, setShakeKey] = useState(0);
    const [isIdChecked, setIsIdChecked] = useState(false);
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [isCheckingId, setIsCheckingId] = useState(false);
    const [checkedId, setCheckedId] = useState("");
    const navigate = useNavigate();

    const handlePhoneNumberChange = (fieldName, value) => {
        const cleanedValue = value.replace(/-/g, "").replace(/\s/g, "");

        if (/\s/.test(value)) {
            showToast("error", "공백은 허용되지 않습니다.");
        }

        let formattedValue = "";
        if (cleanedValue.length <= 3) {
            formattedValue = cleanedValue;
        } else if (cleanedValue.length <= 7) {
            formattedValue = `${cleanedValue.slice(0, 3)}-${cleanedValue.slice(
                3
            )}`;
        } else {
            formattedValue = `${cleanedValue.slice(0, 3)}-${cleanedValue.slice(
                3,
                7
            )}-${cleanedValue.slice(7, 11)}`;
        }

        setValue(fieldName, formattedValue);

        if (errors[fieldName]) {
            clearErrors(fieldName);
        }
    };

    const handleNextStep = async () => {
        const result = await trigger([
            "memberName",
            "memberPassword",
            "name",
            "birth",
            "sex",
            "phoneNumber",
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
                    // showToast("error", "휴대폰 인증을 완료해야 합니다.");
                } else if (!result) {
                    setShakeKey((prev) => prev + 1);
                }
            }
        }
    };

    const handlePrevStep = () => {
        setStep(1);
    };

    const onSubmitSignUp = async (data) => {
        if (!isPhoneVerified) {
            showToast("error", "휴대폰 인증이 완료되지 않았습니다.");
            return;
        }

        const { phoneVerification, ...filteredData } = data;

        try {
            const response = await userSignUp(filteredData);

            if (response.success) {
                showToast("success", "회원가입에 성공하였습니다.");
                navigate("/login");
            } else {
                showToast("error", response.message);
            }
        } catch (error) {
            showToast("error", "회원가입 중 오류가 발생했습니다.");
            console.error("Sign-up error:", error);
        }
    };
    const shakeAnimation = {
        x: [0, -5, 5, -5, 5, 0],
        transition: { duration: 0.3, ease: "easeInOut" },
    };

    const handleInputChange = (fieldName, value) => {
        if (/\s/.test(value)) {
            showToast("error", "공백은 허용되지 않습니다.");
            setValue(fieldName, value.trim());
            return;
        }
        if (errors[fieldName]) {
            clearErrors(fieldName);
        }
    };

    const checkId = async () => {
        const id = getValues("memberName");

        if (id === checkedId) {
            showToast("success", "이미 인증된 아이디입니다.");
            return;
        }

        if (isCheckingId) return;

        setIsCheckingId(true);

        try {
            const response = await idCheck(id);

            if (response.error) {
                showToast("error", response.message);
                setIsIdChecked(false);
            } else if (response === false) {
                setIsIdChecked(true);
                setCheckedId(id);
                showToast("success", "사용 가능한 아이디 입니다.");
            } else {
                setIsIdChecked(false);
                showToast("error", "중복된 아이디 입니다.");
            }
        } catch (error) {
            showToast("error", "중복 검사 중 오류가 발생했습니다.");
        } finally {
            setIsCheckingId(false);
        }
    };

    const verifyPhone = async () => {
        const phoneNumber = getValues("phoneNumber");

        const response = await sendAuth(phoneNumber);

        if (response) {
            showToast("success", "인증번호를 발송하였습니다.");
        } else {
            showToast("error", "인증번호 발송에 실패하였습니다.");
        }
    };

    const verifyPhoneCode = async () => {
        const phoneNumber = getValues("phoneNumber");
        const code = getValues("phoneVerification");

        const response = await verifyCode(phoneNumber, code);

        if (response) {
            showToast("success", "인증이 완료되었습니다.");
            setIsPhoneVerified(true);
        } else {
            showToast("error", "인증에 실패하였습니다.");
            setIsPhoneVerified(false);
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
                            <div>회원 가입</div>
                        </div>
                        <br />
                        <form>
                            <motion.div
                                key={`memberName-${shakeKey}`}
                                className={`${styles.idForm} ${
                                    errors.memberName ? styles.inputError : ""
                                }`}
                                animate={
                                    errors.memberName ? shakeAnimation : {}
                                }
                            >
                                <div className={styles.idInfoText}>아이디</div>
                                <div className={styles.idInputGroup}>
                                    <input
                                        type="text"
                                        placeholder="아이디 4글자 이상"
                                        {...register("memberName", {
                                            required: true,
                                        })}
                                        className={styles.idInput}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "memberName",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <button
                                        type="button"
                                        className={styles.idCheckButton}
                                        onClick={checkId}
                                        disabled={isCheckingId}
                                    >
                                        {isCheckingId
                                            ? "검사 중..."
                                            : "중복 검사"}
                                    </button>
                                </div>
                            </motion.div>
                            <motion.div
                                key={`memberPassword-${shakeKey}`}
                                className={`${styles.passwordForm} ${
                                    errors.memberPassword
                                        ? styles.inputError
                                        : ""
                                }`}
                                animate={
                                    errors.memberPassword ? shakeAnimation : {}
                                }
                            >
                                <div className={styles.pwInfoText}>
                                    비밀번호
                                </div>
                                <input
                                    type="password"
                                    placeholder="비밀번호 입력"
                                    {...register("memberPassword", {
                                        required: true,
                                    })}
                                    className={styles.pwInput}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "memberPassword",
                                            e.target.value
                                        )
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
                                        onChange={(e) =>
                                            handleInputChange(
                                                "name",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </motion.div>
                            <motion.div
                                key={`birth-${shakeKey}`}
                                className={`${styles.birth} ${
                                    errors.birth || errors.sex
                                        ? styles.inputError
                                        : ""
                                }`}
                                animate={
                                    errors.birth || errors.sex
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
                                            {...register("birth", {
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
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "birth",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <div className={styles.dod}>-</div>
                                        <div className={styles.genderGroup}>
                                            <input
                                                type="text"
                                                placeholder="0"
                                                {...register("sex", {
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
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "sex",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <div className={styles.maskedValue}>
                                                <span
                                                    className={styles.maskedDot}
                                                >
                                                    ●
                                                </span>
                                                <span
                                                    className={styles.maskedDot}
                                                >
                                                    ●
                                                </span>
                                                <span
                                                    className={styles.maskedDot}
                                                >
                                                    ●
                                                </span>
                                                <span
                                                    className={styles.maskedDot}
                                                >
                                                    ●
                                                </span>
                                                <span
                                                    className={styles.maskedDot}
                                                >
                                                    ●
                                                </span>
                                                <span
                                                    className={styles.maskedDot}
                                                >
                                                    ●
                                                </span>
                                            </div>
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
                            <div>회원 가입</div>
                        </div>
                        <br />
                        <form onSubmit={handleSubmit(onSubmitSignUp)}>
                            <motion.div
                                key={`phoneNumber-${shakeKey}`}
                                className={`${styles.authInputGroup} ${
                                    errors.phoneNumber ? styles.inputError : ""
                                }`}
                                animate={
                                    errors.phoneNumber ? shakeAnimation : {}
                                }
                            >
                                <div className={styles.phoneInfoText}>
                                    휴대 전화번호
                                </div>
                                <div className={styles.phoneInputGroup}>
                                    <input
                                        type="text"
                                        placeholder="01012345678"
                                        {...register("phoneNumber", {
                                            required: true,
                                        })}
                                        className={styles.phoneInput}
                                        onChange={(e) =>
                                            handlePhoneNumberChange(
                                                "phoneNumber",
                                                e.target.value
                                            )
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
                                        onChange={(e) =>
                                            handleInputChange(
                                                "phoneVerification",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <button
                                        type="button"
                                        className={styles.authCheckButton}
                                        onClick={verifyPhoneCode}
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
                                    onChange={(e) =>
                                        handleInputChange(
                                            "email",
                                            e.target.value
                                        )
                                    }
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
