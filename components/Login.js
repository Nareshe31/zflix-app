import styles from '../scss/components/login.module.scss'
import {useRouter} from 'next/router'
import {useState} from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../store/actions'
import { setCookies } from 'cookies-next'
import HeaderLayout from '../layouts/HeaderLayout'

function Login({ }) {
    const dispatch=useDispatch()

    const [loginForm, setloginForm] = useState({email:'',password:'',errorMessage:'',submitError:false})
    const [submitLoading, setsubmitLoading] = useState(false)
    const router=useRouter()
    const {redirect}=router.query

    const handleSubmit=async(e)=>{
        try {
            e.preventDefault()
            setsubmitLoading(true)
            const {data}=await axios.post('https://zflix-backend.herokuapp.com/api/v2/login',loginForm) 
            dispatch(loginUser(data.user))
            localStorage.setItem('token',data.token)
            setCookies('token',data.token)
            sessionStorage.setItem('user',JSON.stringify(data.user))
            setsubmitLoading(false)
            if (redirect) {
                window.location.href=window.location.origin+decodeURIComponent(redirect)
                return
            }
            window.location.href=window.location.origin+'/en'

        } catch (error) {
            if (error?.response?.data) {
                setloginForm(prev=>({...prev,errorMessage:error.response.data.message,submitError:true}))
                setsubmitLoading(false)
                return
            }
            setloginForm(prev=>({...prev,errorMessage:error.message,submitError:true}))
            setsubmitLoading(false)
            
        }
    }

    const handleChange=(e)=>{
        const {name,value}=e.target
        setloginForm(prev=>({...prev,[name]:value,errorMessage:'',submitError:false}))
    }

    return (
        <>
        <HeaderLayout title={"Login - Zflix"} />
            <section className={styles.login_section}>
                <div className={styles.login_container}>
                    <div className={styles.login_header}>
                        <h3>Sigin via email</h3>
                    </div>
                    <div className={styles.login_form}>
                        <form onSubmit={handleSubmit} action="">
                            <div className={styles.input_group}>
                                <label htmlFor="email">Email</label>
                                <input type="text" name="email" value={loginForm.email} onChange={handleChange} id="email" placeholder='abc@xyz.com' />
                            </div>
                            <div className={styles.input_group}>
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" value={loginForm.password} onChange={handleChange} id="password" placeholder='********' />
                            </div>
                            <div className={styles.submit_button}>
                                <button disabled={submitLoading} type="submit">{submitLoading?"loading...":"Sign In"}</button>
                            </div>
                            <div className={styles.error_container} style={{"opacity":loginForm.submitError?1:0}}>
                                <p className={styles.error_text}>{loginForm.submitError?loginForm.errorMessage:'No error'}</p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;
