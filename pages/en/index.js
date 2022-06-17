import Home from '../../components/Home';

function HomePage({movieData,tvData,personData,base_url}) {

    return (
        <Home movieData={movieData} tvData={tvData} personData={personData} base_url={base_url} />
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
        
        return {
            props:{
                movieData:movieData.results,
                tvData:tvData.results,
                personData:personData.results,
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
