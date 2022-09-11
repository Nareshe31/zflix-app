
export default async function handler(req, res) {
    try {
        if (req.method!=="GET") {
            res.status(400).send({ message: "An error occurred",error:"Request is not allowed" });
        }
        const {query,page}=req.query
        var response = await fetch(
            `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
        );
        var data=await response.json()
        res.send({...data,query,success:true});
        }
       
    catch (error) {
        console.log(error.message);
        res.status(400).send({ message: "An error occurred, please try again later",error:error.message });
    }
}
