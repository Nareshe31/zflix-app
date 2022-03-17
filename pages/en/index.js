import Home from '../../components/Home';
import { motion } from "framer-motion";
import axios from 'axios';

function HomePage({movieData,tvData,base_url,ip}) {
    const config = {
        type: "spring",
        damping: 20,
        stiffness: 100
      };

    return (
        <motion.main
            transition={config}
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ x: 0, opacity: 0 }} 
        >
            <Home movieData={movieData} tvData={tvData} ip={ip} base_url={base_url} />
        </motion.main>
    );
}

export async function getServerSideProps(context) {
    try {
        let {req}=context
        let ip=req.headers['x-real-ip'] || req.connection.remoteAddress
        axios.post("https://zflix-backend.herokuapp.com/api/v2/add-page-request",{url:context.resolvedUrl,ip_address:ip})
        const movieRes=await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}`)
        const movieData=await movieRes.json()
        const tvRes=await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.TMDB_API_KEY}`)
        const tvData=await tvRes.json()
        return {
            props:{
                movieData:movieData.results,
                tvData:tvData.results,
                base_url: process.env.BASE_URL,
                ip
            }
        }
    } catch (error) {
        return {
            notFound:true
        }
    }
}

export default HomePage;
