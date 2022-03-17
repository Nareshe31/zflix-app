import Movie from "../../../../../components/Movie";
import { motion } from "framer-motion";
import axios from "axios";

function MoviePage({ data, base_url }) {
    const config = {
        type: "spring",
        damping: 20,
        stiffness: 100,
    };

    //   transition={config}
    //   initial={{ scale: 1, opacity: 0,y:50 }}
    //   animate={{ scale: 1, opacity: 1 ,y:0}}
    //   exit={{ x: 0, opacity: 0 }}

    return <Movie data={data} base_url={base_url} />;
}

export async function getServerSideProps(context) {
    try {
        axios.post("https://zflix-backend.herokuapp.com/api/v2/add-page-request",{url:context.resolvedUrl})
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${context.query.id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=images,videos,credits,recommendations,similar`
        );
        const data = await res.json();
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
        console.log(error.message);
        return {
            notFound: true,
        };
    }
}

export default MoviePage;
