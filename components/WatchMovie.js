import { getMinute, getYear, getHour, getMonth } from "../utils/functions";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import styles from "../scss/components/watch-movie.module.scss";
import styles2 from "../scss/components/movie.module.scss";

function WatchMovie({ data, base_url }) {
    const router = useRouter();
    let { id, name, source } = router.query;
    console.log(router);
    const getTitle = () => {
        let title = data.title ? data.title : "";
        let year = data.release_date ? " (" + getYear(data.release_date) + ")" : "";
        return "Watch " + title + year + " - ZFlix";
    };

    function openFullscreen() {
        var elem = document.getElementById("watch-iframe");
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            /* IE11 */
            elem.msRequestFullscreen();
        }
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
            <div className={styles.watch_section}>
                <iframe
                    id="watch-iframe"
                    frameBorder={0}
                    webkitallowfullscreen=""
                    mozallowfullscreen=""
                    allowfullscreen=""
                    src={
                        "https://www.2embed.ru/embed/" +
                        (source === "1" ? "imdb/movie?id=tt" : "tmdb/movie?id=") +
                        id
                    }
                    title={id}
                ></iframe>
                <div className={styles.w_details}>
                    <Link href={"/en/movie/" + id + "/" + name}>
                        <a>
                            <h2 className={styles.title}>
                                {data.title}
                            </h2>
                        </a>
                    </Link>
                    <div className={styles.w_info}>
                        <i className="bi bi-calendar-day"></i>{" "}
                        <span>
                            {getMonth(data.release_date)} {data?.release_date?.slice(8, 10)},{" "}
                            {getYear(data.release_date)}
                        </span>
                        <span className={styles2.dot}></span>
                        <i className="bi bi-star-fill"></i> {data.vote_average}/10
                        <span className={styles2.dot}></span>
                        <i className="bi bi-clock"></i>{" "}
                        {(data.runtime > 60 ? getHour(data.runtime) + "hr " : "") +
                            (getMinute(data.runtime)
                                ? getMinute(data.runtime) + " min"
                                : "")}{" "}
                    </div>
                    <div className={styles2.genres}>
                        {data?.genres?.map((item, i) => (
                            <span className={styles2.genre}>{item.name}</span>
                        ))}
                    </div>
                    <p className={styles.overview}>{data.overview}</p>
                </div>
            </div>
        </>
    );
}

export default WatchMovie;
