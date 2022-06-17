import Login from "../../components/Login"

export default function LoginPage({}) {
    
    return <Login  />
}

export async function getServerSideProps(context) {
    try {
        return {
            props:{
                base_url: process.env.BASE_URL,
            }
        }    
    } catch (error) {
        return {
            notFound:true
        }
    }
}