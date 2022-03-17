import axios from "axios";
import Search from "../../../components/Search";


function SearchPage({data,total_pages,base_url,total_results}) {
    const results=data.results
    
    return <Search results={data.results} base_url={base_url} total_pages={total_pages} total_results={total_results}  />
}

export async function getServerSideProps(context) {
    try {
        let page=context.query.page?context.query.page:1
        let q=context.query.q?context.query.q:''
        axios.post("https://zflix-backend.herokuapp.com/api/v2/add-page-request",{url:context.resolvedUrl})
        if (context.query.q) {
            const res = await fetch(
                `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${q}&page=${page}&include_adult=false`
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

export default SearchPage;
