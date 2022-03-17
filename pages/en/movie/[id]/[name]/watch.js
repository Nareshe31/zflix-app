import axios from "axios";
import WatchMovie from "../../../../../components/WatchMovie";

export default function watch({data,base_url}) {
    
    return <WatchMovie data={data} base_url={base_url}  />
};

export async function getServerSideProps(context) {
    try {
        let {req}=context
        let ip=req.headers['x-real-ip'] || req.connection.remoteAddress
        axios.post("https://zflix-backend.herokuapp.com/api/v2/add-page-request",{url:context.resolvedUrl,ip_address:ip})
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${context.query.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US&append_to_response=videos,credits,recommendations,similar`
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