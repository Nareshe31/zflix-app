import { motion } from "framer-motion";
import Person from "../../../../../components/Person";

function PersonPage({ data, base_url }) {
    const config = {
        type: "spring",
        damping: 20,
        stiffness: 100,
    };

    //   transition={config}
    //   initial={{ scale: 1, opacity: 0,y:50 }}
    //   animate={{ scale: 1, opacity: 1 ,y:0}}
    //   exit={{ x: 0, opacity: 0 }}

    return <Person data={data} base_url={base_url} />;
}

export async function getServerSideProps({query}) {
    try {
        
        const res = await fetch(
            `https://api.themoviedb.org/3/person/${query.id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=images,videos,movie_credits,tv_credits`
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

export default PersonPage;
