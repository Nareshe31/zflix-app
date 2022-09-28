import axios from "axios";
import WatchMovie from "../../../../../components/WatchMovie";
import { checkBothTitle } from "../../../../../utils/functions";

export default function watch({data,base_url}) {
    
    return <WatchMovie data={data} base_url={base_url}  />
};

export async function getServerSideProps(context) {
    try {
        const {id,name}=context.query

        //get movie details from TMDB API
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US&append_to_response=videos,credits,recommendations,similar`
        );
        const data = await res.json();

        //Check if actual and expected titles are same
        const [isTitleSame,actualTitle]=checkBothTitle({title:data?.title,release_date:data?.release_date},name)

        const destinationLink=`/en/movie/${data.id}/${actualTitle}/watch`

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