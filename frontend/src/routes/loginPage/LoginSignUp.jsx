import { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "../../assets/Logo.svg";
import "./LoginSignUp.css";

export default function LoginSignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm();
    const [isActive, setIsActive] = useState(false);
    const [step, setStep] = useState(1);

    const handleRegisterClick = () => {
        setIsActive(true);
        setStep(1);
    };

    const handleLoginClick = () => {
        setIsActive(false);
        setStep(1);
    };

    const handleNextStep = async () => {
        const result = await trigger([
            "id",
            "password",
            "name",
            "birthdate",
            "genderDigit",
        ]);
        if (result) {
            setStep(2);
        }
    };

    const handlePrevStep = () => {
        setStep(1);
    };

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="wrapper">
            <div
                className={`container ${isActive ? "active" : ""}`}
                id="container"
            >
                <div className={`form-container sign-up step-${step}`}>
                    <div className={`form-slide ${step === 1 ? "active" : ""}`}>
                        <form>
                            <div className="signup-text">
                                계정 소유자 정보를 입력해주세요
                            </div>
                            <br />
                            <div className="id-form">
                                <div className="id-info-text">아이디</div>
                                <div className="id-input-group">
                                    <input
                                        type="text"
                                        {...register("id", { required: true })}
                                        className="id-input"
                                    />
                                    <button
                                        type="button"
                                        className="id-check-button"
                                    >
                                        중복 검사
                                    </button>
                                </div>
                                {errors.id && (
                                    <span className="error-message">
                                        아이디를 입력해주세요.
                                    </span>
                                )}
                            </div>
                            <div className="password-form">
                                <div className="pw-info-text">비밀번호</div>
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: true,
                                    })}
                                    className="pw-input"
                                />
                                {errors.password && (
                                    <span className="error-message">
                                        비밀번호를 입력해주세요.
                                    </span>
                                )}
                            </div>
                            <div className="name-birth">
                                <div>
                                    <div className="name-info-text">이름</div>
                                    <input
                                        type="text"
                                        {...register("name", {
                                            required: true,
                                        })}
                                        className="name-input"
                                    />
                                    {errors.name && (
                                        <span className="error-message">
                                            이름을 입력해주세요.
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <div className="birth-info-text">
                                        생년월일
                                    </div>
                                    <div className="birth-gender">
                                        <input
                                            type="text"
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
                                            className="birth-input"
                                        />
                                        <div>&nbsp;-&nbsp;</div>
                                        <input
                                            type="text"
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
                                            className="gender-input"
                                        />
                                        <div className="masked-value">
                                            <span className="masked-dot">
                                                •
                                            </span>
                                            <span className="masked-dot">
                                                •
                                            </span>
                                            <span className="masked-dot">
                                                •
                                            </span>
                                            <span className="masked-dot">
                                                •
                                            </span>
                                            <span className="masked-dot">
                                                •
                                            </span>
                                            <span className="masked-dot">
                                                •
                                            </span>
                                        </div>
                                    </div>
                                    {/* 생년월일 오류 메시지 */}
                                    {errors.birthdate && (
                                        <span className="error-message">
                                            {errors.birthdate.message}
                                        </span>
                                    )}
                                    {/* 성별 코드 오류 메시지 */}
                                    {errors.genderDigit && (
                                        <span className="error-message">
                                            {errors.genderDigit.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleNextStep}
                                className="next-button"
                            >
                                다음
                            </button>
                        </form>
                    </div>
                    <div className={`form-slide ${step === 2 ? "active" : ""}`}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="signup-text">
                                계정 소유자 정보를 입력해주세요
                            </div>
                            <br />
                            <div>
                                <div className="phone-info-text">
                                    휴대 전화번호
                                </div>
                                <input
                                    type="text"
                                    {...register("phone", { required: true })}
                                    className="phone-input"
                                />
                                <button type="button" className="auth-button">
                                    인증 받기
                                </button>
                                {errors.phone && (
                                    <span className="error-message">
                                        전화번호를 입력해주세요.
                                    </span>
                                )}
                            </div>
                            <div className="auth-input-group">
                                <input
                                    type="text"
                                    className="auth-check-input"
                                    {...register("phoneVerification")}
                                />
                                <button
                                    type="button"
                                    className="auth-check-button"
                                >
                                    인증 확인
                                </button>
                            </div>
                            <div>
                                <div className="email-info-text">이메일</div>
                                <input
                                    type="email"
                                    {...register("email", { required: true })}
                                    className="email-input"
                                />
                                {errors.email && (
                                    <span className="error-message">
                                        이메일을 입력해주세요.
                                    </span>
                                )}
                            </div>
                            <div className="button-group">
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="previous-button"
                                >
                                    이전
                                </button>
                                <button type="submit" className="signup-button">
                                    회원가입
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="form-container sign-in">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* <div className="login-text"></div> */}
                        <img src={Logo} className="login-img"></img>
                        <div>
                            <div className="birth-info-text">아이디</div>
                            <input
                                type="text"
                                className="login-id-input"
                                {...register("loginEmail", { required: true })}
                            />
                            {errors.loginEmail && (
                                <span className="error-message">
                                    아이디을 입력해주세요.
                                </span>
                            )}
                        </div>
                        <div>
                            <div className="birth-info-text">비밀번호</div>
                            <input
                                type="password"
                                className="login-pw-input"
                                {...register("loginPassword", {
                                    required: true,
                                })}
                            />
                            {errors.loginPassword && (
                                <span className="error-message">
                                    비밀번호를 입력해주세요.
                                </span>
                            )}
                        </div>
                        <button type="submit" className="login_button">
                            로그인
                        </button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>hi</h1>
                            <p>
                                로그인 페이지로 이동하려면
                                <br />
                                아래 버튼을 클릭해주세요
                            </p>
                            <button
                                className="hidden"
                                id="login"
                                onClick={handleLoginClick}
                            >
                                로그인 하러 가기
                            </button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <div className="welcome">
                                StockCraft에 오신걸<br></br>환영합니다!
                            </div>
                            <p>
                                처음이시면 아래 버튼을 눌러
                                <br />
                                회원가입을 해보세요
                            </p>
                            <button
                                className="hidden"
                                id="register"
                                onClick={handleRegisterClick}
                            >
                                회원가입하러 가기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
