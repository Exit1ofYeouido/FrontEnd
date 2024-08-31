import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "~apis/loginAPI/login";
import styles from "./SignIn.module.css";
import Logo from "../../assets/logo2.svg";
import classNames from "classnames";
import { motion } from "framer-motion";

export default function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        shouldFocusError: false,
    });
    const navigate = useNavigate();

    const onSubmitLogin = async (data) => {
        try {
            await login(data.loginId, data.loginPassword);
            navigate("/home");
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
                    <div className={styles.idForm}>
                        <div className={styles.idText}>아이디</div>
                        <input
                            type="text"
                            className={classNames(styles.loginId, {
                                [styles.inputError]: errors.loginId,
                            })}
                            {...register("loginId", { required: true })}
                        />
                        {errors.loginId && (
                            <span className={styles.errorMessage}>
                                아이디를 입력해주세요.
                            </span>
                        )}
                    </div>
                    <div className={styles.passwordForm}>
                        <div className={styles.passwordText}>비밀번호</div>
                        <input
                            type="password"
                            className={classNames(styles.loginPassword, {
                                [styles.inputError]: errors.loginPassword,
                            })}
                            {...register("loginPassword", { required: true })}
                        />
                        {errors.loginPassword && (
                            <span className={styles.errorMessage}>
                                비밀번호를 입력해주세요.
                            </span>
                        )}
                    </div>
                    <div className={styles.button}>
                        <button type="submit" className={styles.loginButton}>
                            로그인
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
