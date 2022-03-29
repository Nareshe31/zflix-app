import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../scss/components/navbar.module.scss";
import NavSearchMovie from "../atoms/NavSearchMovie";
import NavSearchTv from "../atoms/NavSearchTv";

function SmallDeviceNavbar({ }) {
    const navbarRef = useRef();
    const inputRef = useRef();

    const [moviesDropdown, setmoviesDropdown] = useState(false);
    const [tvshowsDropdown, settvshowsDropdown] = useState(false);
    const [results, setresults] = useState({});
    const [searchContainerVisible, setsearchContainerVisible] = useState(false);
    const [query, setquery] = useState("");
    const [suggestionLoading, setsuggestionLoading] = useState(false);
    const [searchBarActive, setsearchBarActive] = useState(false);
    const [navSide, setnavSide] = useState(false);

    const router = useRouter();
    const { pathname } = router;

    useEffect(() => {

        document.addEventListener("click", (e) => {
            if (e.target.id !== "query" && e.target.id !== "search") {
                setsearchContainerVisible(false);
                setsearchBarActive(false);
            }
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

    return (
        <nav className={styles.navbar_sm} id="navbar" ref={navbarRef}>
            <div className={styles.nav_row_1}>
                <div className={styles.nav_ham_container} onClick={hamOpen}>
                    <div className={styles.ham_line}></div>
                    <div className={styles.ham_line}></div>
                    <div className={styles.ham_line}></div>
                </div>
                <div className={styles.nav_header}>
                    <Link href="/en" passHref>
                        <a>
                            <div className={styles.nav_header_image}>
                                <img src="/assets/apple-touch-icon.png" alt="" srcSet="" />
                            </div>
                        </a>
                    </Link>
                </div>
                <div
                    className={styles.nav_search}
                    id="search"
                    onClick={() => {
                        setsearchBarActive((prev) => !prev);
                    }}
                >
                    <i id="search" className="bi bi-search"></i>
                </div>
            </div>
            <div
                className={
                    searchBarActive
                        ? styles.nav_row_2 + " " + styles.active
                        : styles.nav_row_2
                }
            >
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
                <ul
                    className={
                        searchContainerVisible
                            ? styles.search_results + " " + styles.active
                            : styles.search_results
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
            <div
                className={
                    navSide
                        ? styles.nav_sidebar + " " + styles.active
                        : styles.nav_sidebar
                }
            >
                <div className={styles.nav_side_container}>
                    <div className={styles.nav_close} onClick={hamClose}>
                        <i className="bi bi-x"></i>
                    </div>
                    <ul className={styles.nav_list}>
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
                            <p>Most Popular</p>
                            <p>Most Recent</p>
                            <p>Top Rated</p>
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
                            <p>Most Popular</p>
                            <p>Most Recent</p>
                            <p>Top Rated</p>
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
