import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "~apis/loginAPI/login";
import styles from "./SignIn.module.css";
import Logo from "../../assets/logo2.svg";
import classNames from "classnames";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setCredentials } from "~store/memberIdSlice";
import { useState } from "react";

export default function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        trigger,
        clearErrors,
    } = useForm({
        shouldFocusError: false,
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [shakeKey, setShakeKey] = useState(0);

    const shakeAnimation = {
        x: [0, -5, 5, -5, 5, 0],
        transition: { duration: 0.3, ease: "easeInOut" },
    };

    const handleClick = async () => {
        const result = await trigger(["loginId", "loginPassword"]);

        if (!result) {
            setShakeKey((prev) => prev + 1);
            return;
        }
    };

    const onSubmitLogin = async (data) => {
        try {
            const trimmedData = {
                loginId: data.loginId.trim(),
                loginPassword: data.loginPassword.trim(),
            };

            const result = await login(
                trimmedData.loginId,
                trimmedData.loginPassword
            );
            console.log(result);

            if (!result.error) {
                dispatch(setCredentials({ loginId: trimmedData.loginId }));
                navigate("/home");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className={styles.wrapper}>
            <motion.div
                key="signin-form"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={styles.container}
            >
                <div className={styles.logoForm}>
                    <img src={Logo} className={styles.loginImg} alt="logo" />
                </div>
                <div className={styles.signUp}>
                    계정이 없으신가요?{" "}
                    <span
                        className={styles.signUpButton}
                        onClick={() => navigate("/signup")}
                    >
                        가입하기
                    </span>
                </div>
                <form onSubmit={handleSubmit(onSubmitLogin)}>
                    <motion.div
                        key={`loginId-${shakeKey}`}
                        animate={errors.loginId ? shakeAnimation : {}}
                        className={classNames(styles.idForm, {
                            [styles.inputErrorContainer]: errors.loginId,
                        })}
                    >
                        <div className={styles.idText}>아이디</div>
                        <input
                            type="text"
                            className={styles.loginId}
                            {...register("loginId", { required: true })}
                        />
                    </motion.div>

                    <motion.div
                        key={`loginPassword-${shakeKey}`}
                        animate={errors.loginPassword ? shakeAnimation : {}}
                        className={classNames(styles.passwordForm, {
                            [styles.inputErrorContainer]: errors.loginPassword,
                        })}
                    >
                        <div className={styles.passwordText}>비밀번호</div>
                        <input
                            type="password"
                            className={styles.loginPassword}
                            {...register("loginPassword", { required: true })}
                        />
                    </motion.div>
                    <div className={styles.button}>
                        <button
                            type="submit"
                            className={styles.loginButton}
                            onClick={handleClick}
                        >
                            로그인
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
