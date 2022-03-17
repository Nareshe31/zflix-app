import axios from "axios";
import Tv from "../../../../../components/Tv";

function TvPage({data,base_url}) {
    
    return <Tv data={data} base_url={base_url} />
}

export async function getServerSideProps(context) {
    try {
        axios.post("https://zflix-backend.herokuapp.com/api/v2/add-page-request",{url:context.resolvedUrl})
        const res = await fetch(
            `https://api.themoviedb.org/3/tv/${context.query.id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=images,videos,credits,recommendations,similar`
        );
        const data = await res.json();
        if (!data.hasOwnProperty("success")) {
            return {
                props: {
                    data,
                    base_url: process.env.BASE_URL                
                },
            };
        }
        return {
            notFound: true,
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
}

export default TvPage;
