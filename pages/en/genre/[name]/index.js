import PopularMovie from "../../../../components/Movie/PopularMovie";
import { MOVIE_GENRES } from "../../../../utils/functions";

function GenreMoviePage({ data, base_url, genre }) {
    return (
        <PopularMovie
            data={data}
            base_url={base_url}
            api_url={"/discover/movie"}
            params={`&with_genres=${genre.id}`}
            media_type="movie"
            filter_type="popular"
            title={genre.name}
        />
    );
}

export async function getServerSideProps(context) {
    try {
        const { name } = context.query;
        const g = MOVIE_GENRES.find(
            (i) => String(i.name).toLowerCase() == String(name).toLowerCase()
        );
        const genre = g ?? { id: 28, name: "Action" };
        const res = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${genre.id}&page=1`
        );
        const data = await res.json();

        if (!data.hasOwnProperty("success")) {
            return {
                props: {
                    data,
                    base_url: process.env.BASE_URL,
                    genre,
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

export default GenreMoviePage;
