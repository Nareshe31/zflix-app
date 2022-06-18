import API from "../../../services/api"

function VerifyPage({message}) {
    return <div>
        <p>{message}</p>
    </div>
}

export async function getServerSideProps(context) {
    try {
        const token=context.query.token || ''
        const res=await fetch(API.BASE_URL+'/verify-email?token='+token)
        const resData=await res.json()
        console.log(resData);
        return {
            props:{
                base_url: process.env.BASE_URL,
                message:resData.message
            }
        }
    } catch (error) {
        return {
            notFound:true
        }
    }
}

export default VerifyPage