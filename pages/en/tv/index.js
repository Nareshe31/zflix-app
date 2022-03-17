import axios from "axios"

function TvPage(params) {
    return(
        <div>
            Tv Page
        </div>
    )    
}

export async function getServerSideProps(context) {
    try {
        
        return {
            props:{
                base_url: process.env.BASE_URL
            }
        }
    } catch (error) {
        return {
            notFound:true
        }
    }
}

export default TvPage