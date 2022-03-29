import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../scss/components/navbar.module.scss";
import NavSearchTv from "../atoms/NavSearchTv";
import NavSearchMovie from "../atoms/NavSearchMovie";

function LargeDeviceNavbar({ }) {
    const navbarRef = useRef();
    const inputRef = useRef();

    const [moviesDropdown, setmoviesDropdown] = useState(false);
    const [tvshowsDropdown, settvshowsDropdown] = useState(false);
    const [results, setresults] = useState({});
    const [searchContainerVisible, setsearchContainerVisible] = useState(false);
    const [query, setquery] = useState("");
    const [suggestionLoading, setsuggestionLoading] = useState(false);

    const router = useRouter();
    const { pathname } = router;

    let timer;

    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.keyCode === 191) {
                handleSearchToggle(1);
            }
            if (e.ctrlKey && e.shiftKey && e.keyCode === 72) {
                router.push("/en");
            }
        });

        document.addEventListener("click", (e) => {
            if (e.target.id !== "query" && e.target.id !== "search") {
                setsearchContainerVisible(false);
            }
        });
        window.onscroll = (e) => {
            inputRef.current.blur();
            setsearchContainerVisible(false);
            if (window.pageYOffset > 1) {
                navbarRef.current.classList.add(styles.scroll);
            } else {
                navbarRef.current.classList.remove(styles.scroll);
            }
        };

        if (pathname.match("/en/search")) {
            setquery(router.query.q);
        }
        return () => {
            document.removeEventListener("click", (e) => {
                console.log("click removed");
            });
            window.removeEventListener("scroll", (e) => {
                console.log("scroll removed");
            });
            document.removeEventListener('keydown',(e)=>{
                console.log("keydown removed");
            })
        };
    }, [router]);

    function handleKeyPress(e) {
        window.clearTimeout(timer);
    }

    const clearSearch = () => {
        setquery("");
        setresults([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setsearchContainerVisible(false);
        router.push(`/en/search?q=${query}`);
    };

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

    return (
        <nav className={styles.navbar} ref={navbarRef} id="navbar">
            <div className={styles.nav_left_part}>
                <Link href="/en" passHref>
                    <a>
                        <div className={styles.nav_header}>
                            <img src="/assets/apple-touch-icon.png" alt="" srcSet="" />
                        </div>
                    </a>
                </Link>
                <ul className={styles.nav_list + " " + styles.nav_middle}>
                    <li
                        className={styles.nav_item + " " + styles.dropdown}
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
                        <ul className={styles.nav_list_child + " " + styles.first}>
                            <Link href="/en/movie/popular">
                                <a>
                                    <li className={styles.nav_item_child + " " + styles.first}>
                                        Most Popular
                                    </li>
                                </a>
                            </Link>
                            <Link href="/en/movie/most-recent">
                                <a>
                                    <li className={styles.nav_item_child}>Most Recent</li>
                                </a>
                            </Link>
                            <Link href="/en/movie/top-rated">
                                <a>
                                    <li className={styles.nav_item_child + " " + styles.last}>
                                        Top Rated
                                    </li>
                                </a>
                            </Link>
                        </ul>
                    </li>
                    <li
                        className={styles.nav_item}
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
                        <ul className={styles.nav_list_child + " " + styles.last}>
                            <Link href="/en/tv/popular">
                                <a>
                                    <li className={styles.nav_item_child + " " + styles.first}>
                                        Most Popular
                                    </li>
                                </a>
                            </Link>
                            <Link href="/en/tv/most-recent">
                                <a>
                                    <li className={styles.nav_item_child}>Most Recent</li>
                                </a>
                            </Link>
                            <Link href="/en/tv/top-rated">
                                <a>
                                    <li className={styles.nav_item_child + " " + styles.last}>
                                        Top Rated
                                    </li>
                                </a>
                            </Link>
                        </ul>
                    </li>
                    <Link href="/en/torrent">
                        <a>
                            <li className={styles.nav_item}>Torrents</li>
                        </a>
                    </Link>
                </ul>
            </div>
            <ul className={styles.nav_list}>
                <div className={styles.search_container}>
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
                            onChange={(e) => {
                                setquery(e.target.value);
                            }}
                            placeholder="What are you looking for?"
                        />
                    </form>

                    {suggestionLoading ? (
                        <li
                            className={styles.nav_item + " " + styles.s + " " + styles.load}
                        >
                            <i className="bi bi-arrow-repeat"></i>
                        </li>
                    ) : (
                        <li
                            className={
                                query && query.length
                                    ? styles.nav_item +
                                    " " +
                                    styles.clear +
                                    " " +
                                    styles.s +
                                    " " +
                                    styles.active
                                    : styles.nav_item + " " + styles.clear + " " + styles.s
                            }
                            onClick={clearSearch}
                        >
                            <i className="bi bi-x-lg"></i>
                        </li>
                    )}

                    <li
                        className={styles.nav_item + " " + styles.search + " " + styles.s}
                    >
                        <i className="bi bi-search"></i>
                    </li>

                    <ul
                        className={
                            searchContainerVisible
                                ? styles.s_results + " " + styles.active
                                : styles.s_results
                        }
                    >
                        {results?.results
                            ?.slice(0, 4)
                            ?.map((item, i) =>
                                item.media_type === "movie" ? (
                                    <NavSearchMovie key={item.id} item={item} />
                                ) : item.media_type === "tv" ? (
                                    <NavSearchTv key={item.id} item={item} />
                                ) : null
                            )}
                        {results?.results?.length > 4 ? (
                            <li className={styles.more_results}>
                                <span>See more results</span>
                                <Link href={"/en/search?q=" + query}>
                                    <a>
                                        <span>
                                            <i className="bi bi-arrow-right"></i>
                                        </span>
                                    </a>
                                </Link>
                            </li>
                        ) : null}
                    </ul>
                </div>
                {/* <Link href="/en/login">
                        <a>
                            <li className={styles.nav_item}>Login</li>
                        </a>
                    </Link>
                    <Link href="/en/login">
                        <a>
                            <li className={styles.nav_item}>Sign Up</li>
                        </a>
                    </Link> */}
            </ul>
        </nav>
    );
}

export default LargeDeviceNavbar;
