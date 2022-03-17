import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../scss/components/torrent.module.scss";
import Head from "next/head";
import { getDate } from "../utils/functions";
const dropValues = [
    { name: "Yts", value: "Yts", type: "Movies" },
    { name: "Pirate Bay", value: "ThePirateBay", type: "All" },
    { name: "Rarbg", value: "Rarbg", type: "All" },
];
function TorrentSearch({ base_url }) {
    const router = useRouter();
    const [query, setquery] = useState("");
    const [torrents, settorrents] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);
    const [searchType, setsearchType] = useState({
        name: "Yts",
        value: "Yts",
        type: "Movies",
    });
    const [dropdownActive, setdropdownActive] = useState(false);
    let overview =
        "ZFlix is the largest free streaming platform for movies and tv shows. Collaborative media and info service featuring high quality content for a huge selection of titles and new releases! Available in all countries.";

    useEffect(() => {
        window.addEventListener("click", (e) => {
            if (e.target.id !== "dropdown" && dropdownActive) {
                setdropdownActive(false);
            }
        });

        return () => { };
    }, [dropdownActive]);

    const getTorrents = async (e) => {
        e.preventDefault();
        try {
            setloading(true);
            seterror(false);
            const { data } = await axios.post("/api/v2/torrent", {
                query,
                providers: [searchType.value],
                type: searchType.type,
            });
            console.log(data);
            settorrents(data);
            setloading(false);
        } catch (error) {
            seterror(true);
            settorrents(error.message.data);
            setloading(false);
        }
    };

    const setDropValue = (value) => {
        setsearchType(value);
        setdropdownActive(false);
    };
    return (
        <>
            <Head>
                <title>Torrent Search - ZFlix</title>
                <meta name="title" content={"Torrent Search - ZFlix"} />
                <meta name="description" content={overview} />
                <meta
                    name="keywords"
                    content="Movies, TV Shows, Streaming, Reviews, Actors, Actresses, Photos, User Ratings, Synopsis, Trailers, Teasers, Credits, Cast"
                />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={base_url + router.asPath} />
                <meta property="og:site_name" content="ZFlix" />
                <meta property="og:title" content={"Torrent Search - ZFlix"} />
                <meta property="og:description" content={overview} />
                <meta property="og:image" content="/favicon.ico" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={base_url + router.asPath} />
                <meta property="twitter:title" content={"Torrent Search - ZFlix"} />
                <meta property="twitter:description" content={overview} />
                <meta property="twitter:image" content="/favicon.ico"></meta>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
                    integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
                    crossorigin="anonymous"
                    referrerpolicy="no-referrer"
                />
            </Head>
            <div className={styles.w_container}>
                <div className={styles.search_input_container}>
                    <form onSubmit={getTorrents}>
                        <input
                            className={styles.search_input}
                            type="text"
                            name="query"
                            placeholder="Search for torrents (movie, tv show, game etc.,)"
                            value={query}
                            onChange={(e) => setquery(e.target.value)}
                        />
                    </form>
                    <div className={styles.dropdown_container} id="dropdown">
                        <div
                            className={styles.selected_value}
                            onClick={() => setdropdownActive((prev) => !prev)}
                            id="dropdown"
                        >
                            <p id="dropdown">{searchType.name}</p>
                            <i id="dropdown" className="bi bi-caret-down-fill"></i>
                        </div>
                        <div
                            className={
                                dropdownActive
                                    ? styles.option_container + " " + styles.active
                                    : styles.option_container
                            }
                        >
                            {dropValues.map((item, i) => (
                                <div
                                    key={i}
                                    className={styles.option}
                                    onClick={() => setDropValue(item)}
                                >
                                    {item.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div
                        style={{
                            margin: "20px auto",
                            width: "max-content",
                        }}
                    >
                        Loading
                    </div>
                ) : (
                    <>
                        {!error && torrents?.results?.length ? (
                            <div className={styles.result_container}>
                                <div className={styles.torrent_header}>
                                    <p>
                                        Search Results for{" "}
                                        <strong>
                                            <em>{torrents.query}</em>
                                        </strong>
                                    </p>
                                </div>
                                <div className={styles.torrent_results}>
                                    {torrents?.results?.map((item, i) => (
                                        <TorrentBox key={i} item={item} />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <>
                                {error ? (
                                    <div
                                        style={{
                                            margin: "40px auto",
                                            width: "max-content",
                                        }}
                                    >
                                        <h3>Could not find torrents</h3>
                                    </div>
                                ) : (
                                    <div
                                        style={{
                                            margin: "40px auto",
                                            width: "max-content",
                                        }}
                                    >
                                        <h3>No results found</h3>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

function TorrentBox({ item }) {
    const PirateBayMagnetLink = ({ magnet }) => {
        return (
            <a href={magnet}>
                <div className={styles.torrent_magnet}>
                    <span>
                        <i class="fa-solid fa-magnet"></i>
                    </span>
                </div>
            </a>
        );
    };

    const YtsMagnetLink = ({ hash, title }) => {
        let link1 = "magnet:?xt=urn:btih:";
        let link2 = "&amp;dn=";
        let link3 =
            "&amp;tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&amp;tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&amp;tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&amp;tr=udp%3A%2F%2Fp4p.arenabg.ch%3A1337&amp;tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337";
        return (
            <a href={link1 + String(hash).slice(-40) + link2 + title + link3}>
                <div className={styles.torrent_magnet}>
                    <span>
                        <i class="fa-solid fa-magnet"></i>
                    </span>
                </div>
            </a>
        );
    };
    const MagnetLink = ({ item }) => {
        let magnet;
        switch (item.provider) {
            case "ThePirateBay":
                magnet = <PirateBayMagnetLink magnet={item.magnet} />;
                break;
            case "Yts":
                magnet = <YtsMagnetLink hash={item.link} title={item.title} />;
                break;
            case "Rarbg":
                magnet = <PirateBayMagnetLink magnet={item.magnet} />;
                break;
            default:
                magnet = null;
                break;
        }
        return magnet;
    };
    const TorrentDate = ({ item }) => {
        let magnet;
        switch (item.provider) {
            case "ThePirateBay":
                magnet = (
                    <span className={styles.torrent_detail_content}>
                        {String(item.time).slice(4, 16)}
                    </span>
                );
                break;
            case "Yts":
                magnet = (
                    <span className={styles.torrent_detail_content}>
                        {getDate(String(item.time).slice(0, 10))}
                    </span>
                );
                break;
            case "Rarbg":
                magnet = (
                    <span className={styles.torrent_detail_content}>
                        {getDate(String(item.time).slice(0, 10))}
                    </span>
                );
                break;
            default:
                magnet = null;
                break;
        }
        console.log(magnet);
        return magnet;
    };
    return (
        <div className={styles.torrent_box}>
            <div className={styles.torrent_box_r_1}>
                <div className={styles.torrent_box_r_c_1}>{item.title}</div>
                <div className={styles.torrent_box_r_c_2}>
                    <div className={styles.torrent_detail_container}>
                        <span className={styles.torrent_detail_icon}>
                            <i className="bi bi-server"></i>
                        </span>
                        <span className={styles.torrent_detail_content}>{item.size}</span>
                    </div>
                    <div className={styles.torrent_detail_container}>
                        <span className={styles.torrent_detail_icon}>
                            <i className="bi bi-upload"></i>
                        </span>
                        <span className={styles.torrent_detail_content}>{item.seeds}</span>
                    </div>
                    <div className={styles.torrent_detail_container}>
                        <span className={styles.torrent_detail_icon}>
                            <i className="bi bi-download"></i>
                        </span>
                        <span className={styles.torrent_detail_content}>{item.peers}</span>
                    </div>
                    <div className={styles.torrent_detail_container}>
                        <span className={styles.torrent_detail_icon}>
                            <i className="bi bi-calendar-day"></i>
                        </span>
                        <TorrentDate item={item} />
                    </div>
                </div>
            </div>
            <div className={styles.torrent_box_r_2}>
                <MagnetLink item={item} />
            </div>
        </div>
    );
}

export default TorrentSearch;
