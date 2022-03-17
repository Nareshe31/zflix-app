import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { covertToLinkWords, getYear, getDate } from "../globalUtils/functions";

function Header() {
    const { search, pathname } = useLocation();
    const [moviesDropdown, setmoviesDropdown] = useState(false);
    const [tvshowsDropdown, settvshowsDropdown] = useState(false);
    const [searchShow, setsearchShow] = useState(false);
    const [query, setquery] = useState("");
    const inputRef = useRef();
    const [results, setresults] = useState({});
    const [searchContainerVisible, setsearchContainerVisible] = useState(false);
    const [currentSuggestion, setcurrentSuggestion] = useState(0);
    const [suggestionLoading, setsuggestionLoading] = useState(false);

    let queryParams = new URLSearchParams(useLocation().search)

    let navigate = useNavigate();
    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.keyCode === 191) {
                handleSearchToggle();
            }
            if (e.ctrlKey && e.shiftKey && e.keyCode === 72) {
                navigate("/en");
            }
        });
        document.addEventListener("click", (e) => {
            if (e.target.id !== "query") {
                setsearchContainerVisible(false);
            }
        });
        window.onscroll = (e) => {
            if (window.pageYOffset > 1) {
                document.querySelector(".navbar").classList.add("scroll");
            } else {
                document.querySelector(".navbar").classList.remove("scroll");
            }
        };

        if (pathname === "/en/search") {
            setquery(queryParams.get("q"))
        }
        // return () => { document.removeEventListener('click',(e)=>{console.log("click removed");})};
    }, []);


    useEffect(() => {
        if (pathname !== "/en/search") {
            inputRef.current.blur();
        }
        return () => { };
    }, [search]);

    let timer;

    const handleSearchToggle = () => {
        inputRef.current.focus();
    };
    const clearSearch = () => {
        setquery("");
        setresults([]);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // navigate({
        //     pathname: "/en/search",
        //     search: "?" + new URLSearchParams({ q: query }).toString(),
        // });
    };

    function suggestionUp() {
        if (results.results.length > 1 && currentSuggestion !== 0) {
            setcurrentSuggestion((prev) => prev - 1);
        }
    }

    function suggestionDown() {
        if (results.results.length >= 4 && currentSuggestion !== 3) {
            setcurrentSuggestion((prev) => prev + 1);
        } else if (currentSuggestion !== results.results.length - 1) {
            setcurrentSuggestion((prev) => prev + 1);
        }
    }
    const getResults = async () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(async () => {
            try {
                if (query && query?.length) {
                    setsuggestionLoading(true);
                    var response = await axios.get(
                        `
                        https://api.themoviedb.org/3/search/multi?api_key=dfc43a605d906f9da6982495ad7bb34e&language=en-US&query=${query}&page=1&include_adult=false`
                    );
                    setresults(response.data);
                    setsuggestionLoading(false);
                } else {
                    setresults([]);
                }
            } catch (error) {
                console.log("error ", error);
            }
        }, 250);
    };

    function handleKeyPress(e) {
        window.clearTimeout(timer);
    }
    function onhover(i) {
        // setcurrentSuggestion(i)
    }
    return (
        <nav className="navbar" id="navbar">
            <div className="nav-left-part">
                <Link to="/">
                    <div className="nav-header">
                        <img src="/apple-touch-icon.png" alt="" srcset="" />
                    </div>
                </Link>
                <ul className="nav-list nav-middle">
                    <Link to="/en/movie">
                        <li
                            className="nav-item dropdown"
                            onMouseEnter={() => setmoviesDropdown(true)}
                            onMouseLeave={() => setmoviesDropdown(false)}
                        >
                            Movies
                            <span>
                                <i
                                    className={
                                        moviesDropdown ? "bi bi-chevron-up" : "bi bi-chevron-down"
                                    }
                                ></i>
                            </span>
                            <ul className="nav-list-child first">
                                <Link to="/en/popular/movies">
                                    <li className="nav-item-child first">Most Popular</li>
                                </Link>
                                <Link to="/en/most-recent/movies">
                                    <li className="nav-item-child">Most Recent</li>
                                </Link>
                                <Link to="/en/top-rated/movies">
                                    <li className="nav-item-child last">Top Rated</li>
                                </Link>
                            </ul>
                        </li>
                    </Link>
                    <Link to="/en/tv">
                        <li
                            className="nav-item"
                            onMouseEnter={() => settvshowsDropdown(true)}
                            onMouseLeave={() => settvshowsDropdown(false)}
                        >
                            TV Shows
                            <span>
                                <i
                                    className={
                                        tvshowsDropdown ? "bi bi-chevron-up" : "bi bi-chevron-down"
                                    }
                                ></i>
                            </span>
                            <ul className="nav-list-child last">
                                <Link to="/en/popular/tv-shows">
                                    <li className="nav-item-child first">Most Popular</li>
                                </Link>
                                <Link to="/en/most-recent/tv-shows">
                                    <li className="nav-item-child">Most Recent</li>
                                </Link>
                                <Link to="/en/top-rated/tv-shows">
                                    <li className="nav-item-child last">Top Rated</li>
                                </Link>
                            </ul>
                        </li>
                    </Link>
                    <Link to="/en/login">
                        <li className="nav-item">Genre</li>
                    </Link>
                </ul>
            </div>
            <ul className="nav-list">
                <div className="search-container">
                    <form onSubmit={handleSubmit}>
                        <input
                            ref={inputRef}
                            autoComplete="false"
                            autoCorrect="false"
                            spellCheck={false}
                            type="text"
                            name="q"
                            id="query"
                            value={query}
                            onFocus={() => setsearchContainerVisible(true)}
                            onKeyUp={getResults}
                            onKeyPress={handleKeyPress}
                            onChange={(e) => setquery(e.target.value)}
                            placeholder="What are you looking for?"
                        />
                    </form>

                    {suggestionLoading ? (
                        <li className="nav-item s load">
                            <i class="bi bi-arrow-repeat"></i>
                        </li>
                    ) : (
                        <li
                            className={
                                query && query.length ? "nav-item clear s active" : "nav-item clear s"
                            }
                            onClick={clearSearch}
                        >
                            <i className="bi bi-x-lg"></i>
                        </li>
                    )}

                    <li className="nav-item search s" onClick={handleSearchToggle}>
                        <i className="bi bi-search"></i>
                    </li>

                    <ul
                        className={
                            searchContainerVisible ? "s-results active" : "s-results"
                        }
                    >
                        {results?.results
                            ?.slice(0, 4)
                            ?.map((item, i) =>
                                item.media_type === "movie" ? (
                                    <Movie
                                        index={i}
                                        onhover={onhover}
                                        key={item.id}
                                        active={currentSuggestion === i ? true : false}
                                        item={item}
                                    />
                                ) : item.media_type === "tv" ? (
                                    <Tv
                                        key={item.id}
                                        index={i}
                                        onhover={onhover}
                                        active={currentSuggestion === i ? true : false}
                                        item={item}
                                    />
                                ) : null
                            )}
                        {results?.results?.length > 4 ? (
                            <li className="more-results">
                                <span>See more results</span>
                                <Link to={"/en/search?q=" + query + "&page=1"}>
                                    <span>
                                        <i className="bi bi-arrow-right"></i>
                                    </span>
                                </Link>
                            </li>
                        ) : null}
                    </ul>
                </div>
                <Link to="/en/login">
                    <li className="nav-item">Login</li>
                </Link>
                <Link to="/en/login">
                    <li className="nav-item">Sign Up</li>
                </Link>
            </ul>
        </nav>
    );
}

function Movie({ item, active, index, onhover }) {
    return (
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
            <li
                onMouseEnter={() => onhover(index)}
                className={active ? "result active" : "result"}
            >
                <div className="r-left">
                    {item.poster_path ? (
                        <img
                            src={"https://image.tmdb.org/t/p/original" + item.poster_path}
                            alt={item.title}
                            srcset=""
                        />
                    ) : (
                        <img
                            className="no-image"
                            alt={item.title + "image not found"}
                            src="/assets/image-not-found.png"
                        />
                    )}
                </div>
                <div className="r-right">
                    <p className="title">{item.title}</p>
                    <p>{getDate(item.release_date)}</p>
                    {/* <p>{item?.genre_ids?.map((item1, i) => (
                        <span className="genre">{item1} </span>
                    ))}
                  </p> */}
                    <p>
                        <span style={{ marginRight: "5px" }}>
                            <i style={{ fontSize: "0.8rem" }} className="fas fa-star"></i>
                        </span>
                        {item.vote_average}
                    </p>
                    <p className="media-type">Movie</p>
                </div>
            </li>
        </Link>
    );
}
function Tv({ item, active, index, onhover }) {
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
            <li
                onMouseEnter={() => onhover(index)}
                className={active ? "result active" : "result"}
            >
                <div className="r-left">
                    {item.poster_path ? (
                        <img
                            src={"https://image.tmdb.org/t/p/original" + item.poster_path}
                            alt={item.name}
                            srcset=""
                        />
                    ) : (
                        <img
                            className="no-image"
                            alt={item.name + "image not found"}
                            src="/assets/image-not-found.png"
                        />
                    )}
                </div>
                <div className="r-right">
                    <p className="title">{item.name}</p>
                    <p>{getDate(item.first_air_date)}</p>
                    <p>
                        <span style={{ marginRight: "5px" }}>
                            <i style={{ fontSize: "0.8rem" }} className="fas fa-star"></i>
                        </span>
                        {item.vote_average}
                    </p>
                    <p className="media-type">TV</p>
                </div>
            </li>
        </Link>
    );
}

export default Header;
