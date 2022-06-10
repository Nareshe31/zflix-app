import Profile from "../../components/Profile"
import { getCookie } from 'cookies-next';

function LoginPage({}) {
    return <Profile  />
}

export async function getServerSideProps(context) {
    try {
        let {req,res}=context
        const token=getCookie('token',{req,res})
        if (token) {
            return {
                props:{
                    base_url: process.env.BASE_URL,
                }
            }    
        }
        return {
            props:{
                base_url: process.env.BASE_URL,
            },
            redirect:{
                destination:'/en',
                permanent:false
            }
        }
    } catch (error) {
        console.log(error);
        return {
            notFound:true
        }
    }
}

export default LoginPage