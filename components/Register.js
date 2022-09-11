import styles from "../scss/components/login.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/actions";
import HeaderLayout from "../layouts/HeaderLayout";
import Link from "next/link";
import API from "../services/api";

function Register({ }) {
    const { userData } = useSelector((state) => state.user);
    const [loginForm, setloginForm] = useState({
        name:"",
        email: "",
        password: "",
        errorMessage: "",
        submitError: false,
        success:false,
        showPassword:false,
    });
    const [submitLoading, setsubmitLoading] = useState(false);
    const router = useRouter();
    const { redirect_url } = router.query;

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setsubmitLoading(true);
            const body={
                name:String(loginForm.name).trim(),
                email:String(loginForm.email).trim(),
                password:String(loginForm.password).trim()
            }
            const data = await API.makePostRequest("/signup", body);
            setsubmitLoading(false);
            // handleRedirect();
            setloginForm(prev=>({...prev,name:"",email:"",password:"",success:true,submitError:false,errorMessage:""}))
            addSignUpEvent()
        } catch (error) {
            setloginForm((prev) => ({
                ...prev,
                errorMessage: error.message,
                submitError: true,
                success:false
            }));
            setsubmitLoading(false);
            window.gtag('event', 'sign_up_error');
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

    const closePopup=()=>{
        setloginForm(prev=>({...prev,success:false}))
    }

    const addSignUpEvent=()=>{
        window.gtag('event', 'sign_up');
    }


    if (userData) {
        // router.push("/en");
        setTimeout(() => {
            router.push("/en");
        }, 500);

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
                        <h3>Sign Up</h3>
                    </div>
                    <div className={styles.login_form}>
                        <form onSubmit={handleSubmit} action="">
                            <div className={styles.input_group}>
                                <label htmlFor="name">Name</label>
                                <div className={styles.input}>
                                    <input
                                        type="text"
                                        name="name"
                                        required={true}
                                        minLength={4}
                                        value={loginForm.name}
                                        onChange={handleChange}
                                        id="name"
                                        placeholder="John Doe"
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
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
                                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$"
                                        value={loginForm.password}
                                        onChange={handleChange}
                                        id="password"
                                        placeholder="********"
                                        title="1. One lowercase character 2. One uppercase character 3. One Special Character (!@#$%^&*_=+_) 3.Minimum 8 characters 4. Maximum 16 characters"
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
                                    {submitLoading ? "loading..." : "Sign Up"}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className={styles.login_info}>
                        {/* <Link href={"/en/forgot-password"}>
                            <a>
                                <p>Forgot password?</p>
                            </a>
                        </Link> */}
                        <p>
                            Already have an account?{" "}
                            <Link href={redirect_url?`/en/login?redirect_url=${encodeURIComponent(redirect_url)}`:'/en/login'}>
                                <a>
                                    <span className={styles.bold_text}>Login</span>
                                </a>
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
            {loginForm.success?
            <div className={styles.success_container}>
                <div className={styles.s_container}>
                    <div className={styles.close}>
                        <button onClick={closePopup}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <div className={styles.success_message}>
                        <h2>Thanks! Your account has been successfully created.</h2>
                        <p>Please check your inbox, verification link is sent on your email address. Verify your account and log in to enjoy all the features of ZFlix.</p>
                    </div>
                </div>
            </div>
            :null}
        </>
    );
}

export default Register;
