import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import {
    getMonth,
    getMinute,
    getYear,
    convertMoney,
    getHour,
} from "../utils/functions";
import styles from "../scss/components/movie.module.scss";
import Link from "next/link";
import Image from "next/image";
import PosterListContainer from "./molecules/PosterListContainer";
import CastContainer from "./molecules/CastContainer";
import ImageListContainer from "./molecules/ImageListContainer";
import ImagePreview from "./atoms/ImagePreview";
import VideoContainer from "./molecules/VideoContainer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import API from "../services/api";
import { updateWatchlist } from "../store/actions";

function Movie({ data, base_url }) {
    const router = useRouter();
    let { id, name } = router.query;
    const [torrents, settorrents] = useState({});
    const [selectedImage, setselectedImage] = useState(0);
    const [imagePreview, setimagePreview] = useState(false);
    const [loading, setloading] = useState(false);

    const { userData } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        setloading(false);
        settorrents({});
        async function getAllResults() {
            await getTorrents();
        }
        getAllResults();
    }, [router.query, router.asPath]);

    const getTitle = () => {
        let title = data.title ? data.title : "";
        let year = data.release_date ? " (" + getYear(data.release_date) + ")" : "";
        return title + year + " - ZFlix";
    };

    const getTorrents = async () => {
        try {
            var res = await fetch(
                `
                /api/v2/torrent/movie/${data.imdb_id} ${getYear(
                    data.release_date
                )}`
            );
            let response = await res.json();
            settorrents(response);
        } catch (error) {
            console.log("Cannot find torrents");
        }
    };

    const imageSelect = (index) => {
        setimagePreview(true);
        setselectedImage(index);
        document.body.classList.add("no_scroll");
    };

    const previewClose = () => {
        document.body.classList.remove("no_scroll");
        setimagePreview(false);
    };

    const config = {
        type: "spring",
        damping: 20,
        stiffness: 100,
    };

    //   transition={config}
    //   initial={{ scale: 1, opacity: 0,y:50 }}
    //   animate={{ scale: 1, opacity: 1 ,y:0}}
    //   exit={{ x: 0, opacity: 0 }}
    if (loading) {
        return <div></div>;
    }

    const isAddedToWatchlist =
        userData && userData.watchlist.filter((item) => item.data.id == id);

    const addToWatchlist = async () => {
        try {
            const body = {
                id,
                type: "movie",
                year: data.release_date,
                name: data.title,
                poster_path: data.poster_path,
                overview: data.overview,
            };
            const resdata = await API.makePostRequestWithAuthorization(
                "/add-to-watchlist",
                body,
                userData.token
            );
            dispatch(updateWatchlist(resdata.watchlist));
        } catch (error) {
            console.log(error);
        }
    };

    const removeFromWatchlist = async () => {
        try {
            const body = {
                watchlistId: isAddedToWatchlist[0]._id,
            };
            const data = await API.makePostRequestWithAuthorization(
                "/remove-from-watchlist",
                body,
                userData.token
            );
            dispatch(updateWatchlist(data.watchlist));
        } catch (error) {
            console.log(error);
        }
    };

    const addTorrentMagnet=(name)=>{
        window.gtag('event', 'torrent_magnet_click', {
            'event_label': name,
            'event_category': 'torrent_magent',
            'non_interaction': true
          });
    }
    const addTorrentFile=(name)=>{
        window.gtag('event', 'torrent_file_click', {
            'event_label': name,
            'event_category': 'torrent_file',
            'non_interaction': true
          });
    }
    return (
        <>
            <Head>
                <title>{getTitle()}</title>
                <meta name="title" content={getTitle()} />
                <meta name="description" content={data.overview} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={base_url + router.asPath} />
                <meta property="og:site_name" content="ZFlix" />
                <meta property="og:title" content={getTitle()} />
                <meta property="og:description" content={data.overview} />
                <meta
                    property="og:image"
                    content={"https://image.tmdb.org/t/p/w780" + data.poster_path}
                />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={base_url + router.asPath} />
                <meta property="twitter:title" content={getTitle()} />
                <meta property="twitter:description" content={data.overview} />
                <meta
                    property="twitter:image"
                    content={"https://image.tmdb.org/t/p/w780" + data.poster_path}
                ></meta>
            </Head>
            <div className={styles.w_content}>
                <div className={styles.content}>
                    <div
                        className={styles.content_bg}
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
                        }}
                    ></div>
                    <div className={styles.content_parent}>
                        <div className={styles.content_hero}>
                            <div className={styles.content_info}>
                                <div className={styles.content_poster}>
                                    <div className={styles.content_poster_image}>
                                        <Image
                                            src={
                                                data.poster_path
                                                    ? "https://image.tmdb.org/t/p/w780" + data.poster_path
                                                    : "/assets/image-not-found.png"
                                            }
                                            layout="fill"
                                            placeholder="blur"
                                            objectFit={data.poster_path ? "cover" : "contain"}
                                            objectPosition={data.poster_path ? "top" : "center"}
                                            blurDataURL={
                                                "https://image.tmdb.org/t/p/w780" + data.poster_path
                                            }
                                            alt={data.title}
                                        />
                                    </div>
                                </div>

                                <div className={styles.content_plot}>
                                    <h2 className={styles.content_title}>{data.title}</h2>
                                    <p className={styles.content_tagline}>{data.tagline}</p>
                                    <p className={styles.content_details}>
                                        <i className="bi bi-calendar-day"></i>{" "}
                                        {getMonth(data.release_date)}{" "}
                                        {data?.release_date?.slice(8, 10)},{" "}
                                        {getYear(data.release_date)}
                                        <span className={styles.dot}></span>
                                        <span>
                                            <i className="bi bi-star-fill"></i> {data.vote_average}
                                        </span>
                                        <span className={styles.dot}></span>
                                        <span className={styles.runtime}>
                                            <i className="bi bi-clock"></i>
                                            {(data.runtime > 60
                                                ? getHour(data.runtime) + "hr "
                                                : "") +
                                                (getMinute(data.runtime)
                                                    ? getMinute(data.runtime) + " min"
                                                    : "")}
                                        </span>
                                    </p>
                                    <div className={styles.genres}>
                                        {data?.genres?.map((item, i) => (
                                            <span key={i} className={styles.genre}>
                                                {item.name}
                                            </span>
                                        ))}
                                    </div>
                                    <p className={styles.content_overview}>{data.overview}</p>
                                    {new Date() > new Date(data.release_date) ? (
                                        <div className={styles.show}>
                                            <Link href={"/en/movie/" + id + "/" + name + "/watch"}>
                                                <a>
                                                    <button className={styles.watch_now}>
                                                        <i className="bi bi-play-fill"></i>
                                                        Watch Now
                                                    </button>
                                                </a>
                                            </Link>
                                            {userData !== null ? (
                                                <>
                                                    {isAddedToWatchlist.length ? (
                                                        <button
                                                            className={styles.watchlist}
                                                            onClick={removeFromWatchlist}
                                                        >
                                                            <i className="bi bi-x-lg"></i>
                                                            Remove from watchlist
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className={styles.watchlist}
                                                            onClick={addToWatchlist}
                                                        >
                                                            <i className="bi bi-plus-lg"></i>
                                                            Add to watchlist
                                                        </button>
                                                    )}
                                                </>
                                            ) : (
                                                <button
                                                    className={styles.watchlist}
                                                    id="watchlist"
                                                    onClick={(e)=>{
                                                        e.stopPropagation()
                                                        document.getElementById('watchlist').classList.toggle(styles.active)
                                                        setTimeout(() => {
                                                            document.getElementById('watchlist').classList.toggle(styles.active)
                                                        }, 1000);
                                                    }}
                                                >
                                                    <i className="bi bi-plus-lg"></i>
                                                    Add to watchlist
                                                    <span className={styles.tooltip}>Sign In to add to watchlist</span>
                                                </button>
                                            )}
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                            <div className={styles.content_o_details}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Original Title</td>
                                            <td>{data.original_title}</td>
                                        </tr>
                                        <tr>
                                            <td>Status</td>
                                            <td>{data.status}</td>
                                        </tr>
                                        <tr>
                                            <td>Language</td>
                                            <td>
                                                {" "}
                                                {data.spoken_languages.map((item, i) => (
                                                    <span key={i}>
                                                        {item.english_name}
                                                        {i != data.spoken_languages.length - 1
                                                            ? ","
                                                            : ""}{" "}
                                                    </span>
                                                ))}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Budget</td>
                                            <td>{convertMoney(data.budget)}</td>
                                        </tr>
                                        <tr>
                                            <td>Revenue</td>
                                            <td>{convertMoney(data.revenue)}</td>
                                        </tr>
                                        <tr>
                                            <td>Production</td>
                                            <td>
                                                {" "}
                                                {data.production_companies.map((item, i) => (
                                                    <span key={i}>
                                                        {item.name}
                                                        {i != data.production_companies.length - 1
                                                            ? ","
                                                            : ""}{" "}
                                                    </span>
                                                ))}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Available in</td>
                                            <td>
                                                {Object.keys(torrents).length ? (
                                                    torrents?.results?.length ? null : (
                                                        <span>Not available</span>
                                                    )
                                                ) : (
                                                    <span>Getting torrent files</span>
                                                )}
                                                {torrents?.results?.map((item) => {
                                                    let hash = item.link.split("/")[5];
                                                    let name = String(item.title).split(" ");
                                                    return (
                                                        <a
                                                            onClick={()=>addTorrentMagnet(item.title)}
                                                            title={item.title}
                                                            className="magnet-file"
                                                            href={
                                                                "magnet:?xt=urn:btih:" +
                                                                hash +
                                                                "&amp;dn=" +
                                                                item.title +
                                                                "&amp;tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&amp;tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&amp;tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&amp;tr=udp%3A%2F%2Fp4p.arenabg.ch%3A1337&amp;tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337"
                                                            }
                                                        >
                                                            <img
                                                                src={"/assets/magnet.svg"}
                                                                alt={"Magnet"}
                                                            ></img>{" "}
                                                            <span>{name[name.length - 1]}</span>
                                                        </a>
                                                    );
                                                })}
                                                <br />
                                                {torrents?.results?.map((item) => {
                                                    let hash = item.link.split("/")[5];
                                                    let name = String(item.title).split(" ");
                                                    return (
                                                        <a
                                                            onClick={()=>addTorrentFile(item.title)}
                                                            title={item.title}
                                                            className="torrent-file"
                                                            href={
                                                                "https://torrents.yts.hn/torrent/download/" +
                                                                hash
                                                            }
                                                        >
                                                            <i className="bi bi-download"></i>{" "}
                                                            <span>{name[name.length - 1]}</span>
                                                        </a>
                                                    );
                                                })}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <ImageListContainer
                            data={data.images.backdrops}
                            imageSelect={imageSelect}
                            title="Images"
                        />
                        <VideoContainer
                            data={data?.videos?.results}
                            title="Trailers & Clips"
                        />
                        <CastContainer type="cast" data={data.credits.cast} title="Cast" />
                        <CastContainer type="crew" data={data.credits.crew} title="Crew" />
                        <PosterListContainer
                            type="movie"
                            data={data.recommendations.results}
                            title="More Like This"
                        />
                        <PosterListContainer
                            type="movie"
                            data={data.similar.results}
                            title="Recommendations"
                        />
                    </div>
                </div>
            </div>
            <ImagePreview
                selectedImage={selectedImage}
                data={data.images.backdrops}
                previewClose={previewClose}
                imagePreview={imagePreview}
            />
        </>
    );
}

export default Movie;
