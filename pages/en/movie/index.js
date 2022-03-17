import axios from "axios"

function MoviePage(params) {
    return(
        <div>
            Movie Page
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

export default MoviePage