import axios from "axios";
import Tv from "../../../../../components/Tv";
import { checkBothTitle } from "../../../../../utils/functions";

function TvPage({data,base_url}) {
    
    return <Tv data={data} base_url={base_url} />
}

export async function getServerSideProps(context) {
    try {
        const {id,name}=context.query
        const res = await fetch(
            `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=images,videos,credits,recommendations,similar`
        );
        const data = await res.json();

        const [isTitleSame,actualTitle]=checkBothTitle({title:data?.name,release_date:data?.first_air_date},name)

        const destinationLink="/en/tv/"+data.id+"/"+actualTitle

        if(isTitleSame)  return {
            redirect:{
              destination:destinationLink,
              permanent:false
            }
          }

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
