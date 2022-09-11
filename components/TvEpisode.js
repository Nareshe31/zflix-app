import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import styles from "../scss/components/tv-episode.module.scss";
import styles1 from "../scss/components/watch-movie.module.scss";
import { getMinute, getYear, getHour, getMonth } from "../utils/functions";
import styles2 from "../scss/components/movie.module.scss";
import ScrollContainer from "react-indiana-drag-scroll";
import SeasonContainer from "./molecules/SeasonContainer";
import EpisodeContainer from "./molecules/EpisodeContainer";
import { useSelector } from "react-redux";

function TvEpisode({ data, seasondata, seasonsdata, base_url }) {
    const router = useRouter();
    let { id, name, snumber, enumber } = router.query;

    const { userData } = useSelector((state) => state.user);

    const getTitle = () => {
        let title = seasondata.name ? seasondata.name : "";
        //let year = seasondata.first_air_date ? " (" + getYear(seasondata.first_air_date) + ")" : "";
        let season = snumber ? " Season " + snumber : "";
        let episode = enumber ? " Episode " + enumber : "";
        return "Watch " + title + season + episode + " on ZFlix";
    };
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
                    content={"https://image.tmdb.org/t/p/w780" + data.still_path}
                />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={base_url + router.asPath} />
                <meta property="twitter:title" content={getTitle()} />
                <meta property="twitter:description" content={data.overview} />
                <meta
                    property="twitter:image"
                    content={"https://image.tmdb.org/t/p/w780" + data.still_path}
                ></meta>
            </Head>
            <div className={styles.watch_section}>

                {userData ? (
                    <iframe
                        id="watch-iframe"
                        frameBorder={0}
                        webkitallowfullscreen=""
                        mozallowfullscreen=""
                        allowfullscreen=""
                        src={`https://www.2embed.to/embed/tmdb/tv?id=${id}&s=${snumber}&e=${enumber}`}
                        title={id}
                    ></iframe>
                ) : (
                    <div className={styles.login_container}>
                        <div className={styles.watch_bg_container}>
                            {data.still_path ? (
                                <img
                                    className={styles.watch_bg}
                                    src={"https://image.tmdb.org/t/p/w780" + data.still_path}
                                    alt="Log in to watch for free"
                                    srcset=""
                                />
                            ) : null}
                        </div>
                        <div className={styles.login_message}>
                            <div>
                                <p>Please Sign in to watch for free</p>
                                <Link
                                    href={
                                        "/en/login?redirect_url=" +
                                        encodeURIComponent(router.asPath)
                                    }
                                >
                                    <a>
                                        <button className={styles.login_button}>Sign in</button>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

        
                <div className={styles.w_details}>
                    <Link href={"/en/tv/" + id + "/" + name}>
                        <a>
                            <h2 className={styles.title}>{seasondata.name}</h2>
                        </a>
                    </Link>
                    <h4 className={styles.episode_title}>
                        <Link href={"/en/tv/" + id + "/" + name + "/season/" + snumber}>
                            <a>
                                <span>S{data.season_number}</span>
                            </a>
                        </Link>
                        <span> E{data.episode_number}</span>
                        <span className={styles2.dot}></span>
                        <span>{data.name}</span>
                    </h4>
                    <div className={styles.w_info}>
                        <i className="bi bi-calendar-day"></i>{" "}
                        <span>
                            {getMonth(data.air_date)} {data?.air_date?.slice(8, 10)},{" "}
                            {getYear(data.air_date)}
                        </span>
                        <span className={styles2.dot}></span>
                        <i className="bi bi-star-fill"></i> {data.vote_average}/10
                        <span className={styles2.dot}></span>
                        <i className="bi bi-clock"></i>{" "}
                        {(data.episode_runtime > 60
                            ? getHour(data.episode_runtime) + "hr "
                            : "") +
                            (getMinute(data.episode_runtime)
                                ? getMinute(data.episode_runtime) + " min"
                                : "")}{" "}
                    </div>
                    {data?.genres?.length ? (
                        <div className={styles2.genres}>
                            {data?.genres?.map((item, i) => (
                                <span className={styles2.genre}>{item.name}</span>
                            ))}
                        </div>
                    ) : null}
                    <p className={styles.overview}>{data.overview}</p>
                </div>
                <EpisodeContainer
                    data={seasonsdata}
                    title="Episodes"
                    id={id}
                    name={name}
                    snumber={snumber}
                />
                <SeasonContainer
                    data={seasondata.seasons}
                    id={id}
                    name={name}
                    title="Seasons"
                />
            </div>
        </>
    );
}

export default TvEpisode;
