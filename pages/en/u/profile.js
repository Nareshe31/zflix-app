import Profile from "../../../components/Profile"

function LoginPage({}) {
    return <Profile  />
}

export async function getServerSideProps(context) {
    try {
        return {
            props:{
                base_url: process.env.BASE_URL,
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