import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const getDate = (date) => {
    return (
        months[date?.split("-")[1] - 1] +
        " " +
        date?.split("-")[2] +
        ", " +
        date?.split("-")[0]
    );
};

const getYear = (date) => {
    return date?.slice(0, 4);
};

const removeSpecialCharacters = (title) => {
    return title.replace(/[&#,+()$~%'.":!*?<>{}]/g, "");
};

const covertToLinkWords = (title) => {
    var s = removeSpecialCharacters(title);
    return s.replace(/\s+/g, "-").toLowerCase();
};

function Movie({ item }) {
    return (
        <div className="result-box" key={item.id}>
            <Link
                to={
                    "/en/movie/" +
                    item.id +
                    "/" +
                    covertToLinkWords(item.title) +
                    "-" +
                    getYear(item.release_date)
                }
            >
                <div className="result-image">
                    <img
                        src={
                            item.poster_path
                                ? "https://image.tmdb.org/t/p/original" + item.poster_path
                                : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                        }
                        alt=""
                        srcset=""
                        className={item.poster_path ? "" : "no-image"}
                    />
                </div>
            </Link>
            <div className="result-detail">
                <Link
                    to={
                        "/en/movie/" +
                        item.id +
                        "/" +
                        covertToLinkWords(item.title) +
                        "-" +
                        getYear(item.release_date)
                    }
                >
                    <p className="result-title">{item.title}</p>
                </Link>
                <p className="result-tagline">{item.tagline}</p>
                <p className="result-date">
                    <span>
                        <i class="bi bi-calendar-day"></i>
                    </span>
                    {getDate(item.release_date)}
                </p>
                <p className="result-overview">{item.overview}</p>
                <Link
                    to={
                        "/en/movie/" +
                        item.id +
                        "/" +
                        covertToLinkWords(item.title) +
                        "-" +
                        getYear(item.release_date) +
                        "/watch"
                    }
                >
                    <div className="watch-now">
                        <span>
                            <i class="bi bi-play-fill"></i>
                        </span>
                        Watch Now
                    </div>
                </Link>
                <p className="result-type">Movie</p>
            </div>
        </div>
    );
}
function TvShow({ item }) {
    return (
        <Link
            to={
                "/en/tv/" +
                item.id +
                "/" +
                covertToLinkWords(item.name) +
                "-" +
                getYear(item.first_air_date)
            }
        >
            <div className="result-box" key={item.id}>
                <div className="result-image">
                    <img
                        src={
                            item.poster_path
                                ? "https://image.tmdb.org/t/p/original" + item.poster_path
                                : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                        }
                        alt=""
                        srcset=""
                        className={item.poster_path ? "" : "no-image"}
                    />
                </div>
                <div className="result-detail">
                    <p className="result-title">{item.name}</p>
                    <p className="result-date">
                        <span>
                            <i class="bi bi-calendar-day"></i>
                        </span>
                        {getDate(item.first_air_date)}
                    </p>
                    <p className="result-tagline">{item.tagline}</p>
                    <p className="result-overview">{item.overview}</p>
                    <p className="result-type">TV Show</p>
                </div>
            </div>
        </Link>
    );
}

function Search(props) {
    const { search } = useLocation();
    let queryParams = new URLSearchParams(useLocation().search);
    const [results, setresults] = useState([]);
    const [query, setquery] = useState(queryParams.get("q"));
    const [totalPages, settotalPages] = useState();
    let pageNumber = queryParams.get("page") ? queryParams.get("page") : 1;
    useEffect(() => {
        async function getAllResults() {
            setresults([]);
            await getResults(queryParams.get("q"));
        }
        getAllResults();
        return () => { };
    }, [search]);

    const getResults = async (query) => {
        try {
            if (query) {
                var response = await axios.get(
                    `
            https://api.themoviedb.org/3/search/multi?api_key=dfc43a605d906f9da6982495ad7bb34e&language=en-US&query=${query}&page=${pageNumber}&include_adult=false`
                );
                setresults((prev) => [...prev, ...response.data.results]);
                settotalPages(response.data.total_pages);
            }
        } catch (error) {
            console.log("error ", error);
        }
    };

    function handleChange(event) {
        setquery(event.target.value);
    }
    document.title = queryParams.get("q") + " - ZFlix";
    return (
        <>
            {/* <Header  /> */}
            <div className="search-container">
                {results.length ? (
                    <div className="first-result-container">
                        <div className="first-result-image">
                            <img
                                src={
                                    "https://image.tmdb.org/t/p/original" +
                                    results[0].backdrop_path
                                }
                                alt=""
                            />
                        </div>
                        <div className="first-result-detail">
                            <p className="title">
                                {results[0].media_type === "movie"
                                    ? results[0].title
                                    : results[0].name}{" "}
                                (
                                {results[0].media_type === "movie"
                                    ? getYear(results[0].release_date)
                                    : getYear(results[0].first_air_date)}
                                )
                            </p>
                            <div className="watch-now">
                                <span>
                                    <i class="bi bi-play-fill"></i>
                                </span>
                                Watch Now
                            </div>
                        </div>
                    </div>
                ) : null}
                <div className="whole-results-container">
                    <div className="result-genre"></div>
                    <div className="search-results">
                        <p className="result-heading">Search results for "{queryParams.get("q")}"</p>
                        <div className="results-container">
                            {results.map((item) =>
                                item.media_type === "movie" ? (
                                    <Movie item={item} key={item.id} />
                                ) : (item.media_type === "tv" ?
                                    <TvShow item={item} key={item.id} />:null
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;
