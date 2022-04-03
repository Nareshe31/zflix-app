import axios from "axios"
import PopularMovie from "../../../components/Movie/PopularMovie";

function PopularTvPage({data,base_url}) {
    return <PopularMovie  data={data} base_url={base_url} media_type="tv" filter_type="popular" title="Popular" />
         
}

export async function getServerSideProps(context) {
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}&page=1`
        );
        const data=await res.json()
        if (!data.hasOwnProperty("success")) {
            return {
                props: {
                    data,
                    base_url: process.env.BASE_URL,
                },
            };
        }
        return {
            notFound: true,
        };
    } catch (error) {
        return {
            notFound:true
        }
    }
}

export default PopularTvPage