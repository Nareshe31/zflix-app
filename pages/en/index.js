import Home from '../../components/Home';

function HomePage({movieData,tvData,personData,trendingData,base_url}) {

    return (
        <Home movieData={movieData} tvData={tvData} personData={personData} trendingData={trendingData} base_url={base_url} />
    );
}

export async function getServerSideProps(context) {
    try {
        const movieRes=await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}`)
        const movieData=await movieRes.json()
        const tvRes=await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.TMDB_API_KEY}`)
        const tvData=await tvRes.json()
        const personRes=await fetch(`https://api.themoviedb.org/3/trending/person/day?api_key=${process.env.TMDB_API_KEY}`)
        const personData=await personRes.json()
        const trendingRes=await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.TMDB_API_KEY}`)
        const trendingData=await trendingRes.json()
        return {
            props:{
                movieData:movieData.results,
                tvData:tvData.results,
                personData:personData.results,
                trendingData:trendingData.results,
                base_url: process.env.BASE_URL,
            }
        }
    } catch (error) {
        return {
            notFound:true
        }
    }
}

export default HomePage;
