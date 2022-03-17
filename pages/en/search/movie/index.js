import axios from "axios";
import SearchMovie from "../../../../components/SearchMovie";

function SearchMoviePage({data,total_pages,base_url,total_results}) {
    const results=data.results
    
    return <SearchMovie results={data.results} base_url={base_url} total_pages={total_pages} total_results={total_results} />
}

export async function getServerSideProps(context) {
    try {
        let page=context.query.page?context.query.page:1
        var q1=context.query.q?context.query.q:''
        axios.post("https://zflix-backend.herokuapp.com/api/v2/add-page-request",{url:context.resolvedUrl})
        if (context.query.q) {
            let y=q1.slice(-6)
            let year=y.match(/y(:)[\d]{4}/)?y.split(':')[1]:''
            let q=y.match(/y(:)[\d]{4}/)?q1.slice(0,-6):q1
            const res = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${q}&page=${page}&primary_release_year=${year}&include_adult=false`
            );
            const data = await res.json();
            if (!data.hasOwnProperty("success")) {
                return {
                    props: {
                        data,
                        base_url: process.env.BASE_URL,
                        total_pages:data.total_pages,
                        total_results:data.total_results
                    },
                };
            }
        }
        else{
            return {
                props: {
                    data:{results:[]},
                    base_url: process.env.BASE_URL,
                    total_pages:0,
                    total_results:0
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

export default SearchMoviePage;
