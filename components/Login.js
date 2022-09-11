import styles from "../scss/components/login.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderLayout from "../layouts/HeaderLayout";
import Link from "next/link";
import API from "../services/api";

function Login({ }) {
    const { userData } = useSelector((state) => state.user);
    const [loginForm, setloginForm] = useState({
        email: "",
        password: "",
        errorMessage: "",
        submitError: false,
        success:false,
        showPassword:false
    });
    const [submitLoading, setsubmitLoading] = useState(false);
    const router = useRouter();
    const { redirect_url } = router.query;

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setsubmitLoading(true);
            const body={
                email:loginForm.email,
                password:loginForm.password
            }
            const data = await API.makePostRequest("/login", body);
            localStorage.setItem("token", data.token);
            setsubmitLoading(false);
            handleRedirect();
            setloginForm(prev=>({...prev,success:true,submitError:false,errorMessage:""}))
            addLoginEvent(data.user)
        } catch (error) {
            setloginForm((prev) => ({
                ...prev,
                errorMessage: error.message,
                submitError: true,
                success:false
            }));
            setsubmitLoading(false);
            window.gtag('event', 'login_error');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setloginForm((prev) => ({
            ...prev,
            [name]: value,
            errorMessage: "",
            submitError: false,
        }));
    };

    const handleRedirect = () => {
        if (redirect_url) {
            window.location.href =
                window.location.origin + decodeURIComponent(redirect_url);
            return;
        }
        window.location.href = window.location.origin + "/en";
    };

    const addLoginEvent=(data)=>{
        window.gtag('event', 'login',{user_data:data});
    }

    if (userData) {
        // router.push("/en");
        setTimeout(() => {
            router.push("/en");
        }, 1000);

        return (
            <>
                <HeaderLayout title={"Login - Zflix"} />
                <div className={styles.login_section}>
                    <p style={{"maxWidth":"300px"}}>You've already logged in. Redirecting to home page, if not redirected
                    click <a href="/en" style={{"color":"blue"}}> here</a></p>
                </div>
            </>
        );
    }

    return (
        <>
            <HeaderLayout title={"Login - Zflix"} />
            <section className={styles.login_section}>
                <div className={styles.login_container}>
                    <div className={styles.login_header}>
                        <h3>Sign In via email</h3>
                    </div>
                    <div className={styles.login_form}>
                        <form onSubmit={handleSubmit} action="">
                            <div className={styles.input_group}>
                                <label htmlFor="email">Email</label>
                                <div className={styles.input}>
                                    <input
                                        type="email"
                                        name="email"
                                        required={true}
                                        value={loginForm.email}
                                        onChange={handleChange}
                                        id="email"
                                        placeholder="abc@xyz.com"
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            <div className={styles.input_group}>
                                <label htmlFor="password">Password</label>
                                <div className={styles.input}>
                                    <input
                                        type={loginForm.showPassword?"text":"password"}
                                        name="password"
                                        required={true}
                                        value={loginForm.password}
                                        onChange={handleChange}
                                        id="password"
                                        placeholder="********"
                                    />
                                    <span title={loginForm.showPassword?"Hide password":"Show password"} onClick={()=>setloginForm(prev=>({...prev,showPassword:!prev.showPassword}))}>
                                        <i className={loginForm.showPassword?"bi bi-eye-slash":"bi bi-eye"}></i>
                                    </span>
                                </div>
                            </div>
                            <div
                                className={styles.message_container}
                                // style={{ display: loginForm.submitError ? "block" : "block" }}
                            >
                                <p className={styles.error_text}>
                                    {loginForm.submitError ? loginForm.errorMessage : ""}
                                </p>
                                <p className={styles.success_text}>
                                    {loginForm.success?"Sign In successful. Redirecting to corresponding page...":""}
                                </p>
                            </div>
                            <div className={styles.submit_button}>
                                <button disabled={submitLoading} type="submit">
                                    {submitLoading ? "loading..." : "Sign In"}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className={styles.login_info}>
                    <p>
                            Don't have an account?{" "}
                            <Link href={redirect_url?`/en/register?redirect_url=${encodeURIComponent(redirect_url)}`:'/en/signup'}>
                                <a>
                                    <span className={styles.bold_text}>Register</span>
                                </a>
                            </Link>
                        </p>
                        {/* <Link href={"/en/forgot-password"}>
                            <a> */}
                            <div>
                                <p>Forgot password?</p>
                                <p>Contact &nbsp;<a className={styles.bold_text} href="mailto:zflix.contact@protonmail.com">zflix.contact@protonmail.com</a></p>
                            </div>
                            {/* </a>
                        </Link> */}
                       
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;
