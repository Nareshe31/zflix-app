import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../scss/components/navbar.module.scss";
import NavSearchMovie from "../atoms/NavSearchMovie";
import NavSearchTv from "../atoms/NavSearchTv";
import NavSearchPerson from "../atoms/NavSearchPerson";
import { useSelector } from "react-redux";

function SmallDeviceNavbar({ }) {
    const navbarRef = useRef();
    const inputRef = useRef();

    const [moviesDropdown, setmoviesDropdown] = useState(false);
    const [tvshowsDropdown, settvshowsDropdown] = useState(false);
    const [results, setresults] = useState({});
    // const [searchContainerVisible, setsearchContainerVisible] = useState(false);
    const [query, setquery] = useState("");
    const [suggestionLoading, setsuggestionLoading] = useState(false);
    const [searchBarActive, setsearchBarActive] = useState(false);
    const [navSide, setnavSide] = useState(false);

    //user
    const { userData } = useSelector((state) => state.user);

    const router = useRouter();
    const { pathname } = router;

    useEffect(() => {
        // document.addEventListener("click", (e) => {
        //     if (e.target.id !== "query" && e.target.id !== "search") {
        //         closeSearchBar()
        //     }
        // });
        router.beforePopState(({ as }) => {
            if (searchBarActive) {
                alert("back button");
                return false;
            }
            return true;
        });
        window.onscroll = (e) => {
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
            setsearchBarActive(false);
            router.beforePopState(() => true);
        };
    }, [router]);

    useEffect(() => {
        setsearchBarActive(false);
        setnavSide(false);
        document.body.classList.remove("no_scroll");
        return () => {
            setsearchBarActive(false);
            setnavSide(false);
        };
    }, [router.route]);

    let timer;

    useEffect(() => {
        if (searchBarActive) {
            handleSearchToggle();
        }
        return () => { };
    }, [searchBarActive]);

    const handleSearchToggle = () => {
        inputRef.current.focus();
    };
    function handleKeyPress(e) {
        window.clearTimeout(timer);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
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

    function hamOpen() {
        document.body.classList.add("no_scroll");
        setnavSide(true);
    }
    function hamClose() {
        document.body.classList.remove("no_scroll");
        setmoviesDropdown(false);
        settvshowsDropdown(false);
        setnavSide(false);
    }

    function closeSearchBar() {
        document.body.classList.remove("no_scroll");
        setsearchBarActive(false);
    }
    function openSearchBar() {
        document.body.classList.add("no_scroll");
        setsearchBarActive(true);
    }
    function clearSearch() {
        setquery("");
        setresults({});
        inputRef.current.focus();
    }
    return (
        <nav className={styles.navbar_sm} id="navbar" ref={navbarRef}>
            <div className={styles.nav_row_1}>
                <button className={styles.nav_ham_container} onClick={hamOpen}>
                    <div className={styles.ham_line}></div>
                    <div className={styles.ham_line}></div>
                    <div className={styles.ham_line}></div>
                </button>
                <div className={styles.nav_header}>
                    <Link href="/en" passHref>
                        <a>
                            <div className={styles.nav_header_image}>
                                <img src="/assets/apple-touch-icon.png" alt="" srcSet="" />
                            </div>
                        </a>
                    </Link>
                </div>
                <div className={styles.nav_search} id="search" onClick={openSearchBar}>
                    <i id="search" className="bi bi-search"></i>
                </div>
            </div>
            <div
                className={
                    searchBarActive
                        ? styles.search_container_full + " " + styles.active
                        : styles.search_container_full
                }
            >
                <div className={styles.nav_row_2}>
                    <span className={styles.back_arrow} onClick={closeSearchBar}>
                        <i className="bi bi-arrow-left"></i>
                    </span>
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
                            onKeyUp={getResults}
                            onKeyPress={handleKeyPress}
                            onChange={(e) => setquery(e.target.value)}
                            placeholder="What are you looking for?"
                        />
                    </form>
                    <span
                        className={
                            query !== ""
                                ? styles.clear_search + " " + styles.active
                                : styles.clear_search
                        }
                        onClick={clearSearch}
                    >
                        <i className="bi bi-x-lg"></i>
                    </span>
                </div>
                {Object.keys(results).length ? (
                    <ul className={styles.search_results}>
                        {results?.results
                            ?.slice(0, 6)
                            ?.map((item, i) =>
                                item.media_type === "movie" ? (
                                    <NavSearchMovie key={item.id} hover={false} item={item} />
                                ) : item.media_type === "tv" ? (
                                    <NavSearchTv key={item.id} hover={false} item={item} />
                                ) : (
                                    <NavSearchPerson key={item.id} item={item} hover={false} />
                                )
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
                        ) : (
                            <div className={styles.start_search_container}>
                                No results found
                            </div>
                        )}
                    </ul>
                ) : (
                    <div className={styles.start_search_container}>
                        Search for movies and tv shows
                    </div>
                )}
            </div>
            <div
                className={
                    navSide
                        ? styles.nav_sidebar + " " + styles.active
                        : styles.nav_sidebar
                }
                onClick={hamClose}
            >
                <div
                    className={styles.nav_side_container}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className={styles.nav_close} onClick={hamClose}>
                        <i className="bi bi-x"></i>
                    </button>
                    <ul className={styles.nav_list}>
                        {userData ? (
                            <Link href="/en/u/profile">
                                <a>
                                    <li className={styles.nav_item}>
                                        <div className={styles.profile_container}>
                                            <div>
                                                {/* <i class="bi bi-person-circle"></i> */}
                                                <img src="/assets/avatar.png" alt="" srcset="" />
                                            </div>
                                            <div className={styles.info}>
                                                <p>{userData.name}</p>
                                                <p className={styles.login_info}>Logged In via phone</p>
                                            </div>
                                            <div>
                                                <i class="bi bi-chevron-right"></i>
                                            </div>
                                        </div>
                                    </li>
                                </a>
                            </Link>
                        ) : (
                            <Link href="/en/login">
                                <a>
                                    <li className={styles.nav_item_with_info}>
                                        Sign In
                                        <span className={styles.nav_info}>
                                            For better experience
                                        </span>
                                    </li>
                                </a>
                            </Link>
                        )}
                        {userData ? (
                            <Link href="/en/u/watchlist">
                                <a>
                                    <li className={styles.nav_item}>Watchlist</li>
                                </a>
                            </Link>
                        ) : null}
                        <li
                            className={styles.nav_item + " " + styles.dropdown}
                            onClick={() => setmoviesDropdown((prev) => !prev)}
                        >
                            Movies
                            <span>
                                <i
                                    className={
                                        moviesDropdown ? "bi bi-chevron-up" : "bi bi-chevron-down"
                                    }
                                ></i>
                            </span>
                        </li>
                        <div
                            className={
                                moviesDropdown
                                    ? styles.nav_list_child + " " + styles.active
                                    : styles.nav_list_child
                            }
                        >
                            <Link href={"/en/movie/popular"}>
                                <p>Most Popular</p>
                            </Link>
                            <Link href={"/en/movie/most-recent"}>
                                <p>Most Recent</p>
                            </Link>
                            <Link href={"/en/movie/top-rated"}>
                                <p>Top Rated</p>
                            </Link>
                        </div>
                        <li
                            className={styles.nav_item + " " + styles.dropdown}
                            onClick={() => settvshowsDropdown((prev) => !prev)}
                        >
                            Tv Shows
                            <span>
                                <i
                                    className={
                                        tvshowsDropdown ? "bi bi-chevron-up" : "bi bi-chevron-down"
                                    }
                                ></i>
                            </span>
                        </li>
                        <div
                            className={
                                tvshowsDropdown
                                    ? styles.nav_list_child + " " + styles.active
                                    : styles.nav_list_child
                            }
                        >
                            <Link href={"/en/tv/popular"}>
                                <p>Most Popular</p>
                            </Link>
                            <Link href={"/en/tv/most-recent"}>
                                <p>Most Recent</p>
                            </Link>
                            <Link href={"/en/tv/top-rated"}>
                                <p>Top Rated</p>
                            </Link>
                        </div>
                        <Link href="/en/torrent">
                            <a>
                                <li className={styles.nav_item}>Torrents</li>
                            </a>
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default SmallDeviceNavbar;
