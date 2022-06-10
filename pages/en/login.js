import { getCookie } from 'cookies-next';
import Login from "../../components/Login"

export default function LoginPage({}) {
    
    return <Login  />
}

export async function getServerSideProps(context) {
    try {
        let {req,res}=context
        const token=getCookie('token',{req,res})
        if (!token) {
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
        return {
            notFound:true
        }
    }
}