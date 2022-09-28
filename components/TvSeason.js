import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { getYear, getMonth, getDate, getLink } from "../utils/functions";
import styles from "../scss/components/tv-season.module.scss";
import ScrollContainer from "react-indiana-drag-scroll";
import styles2 from '../scss/components/movie.module.scss';
import SeasonContainer from "./molecules/SeasonContainer";
import EpisodeContainer from "./molecules/EpisodeContainer";

function TvSeason({ data, seasondata, base_url }) {
    const router = useRouter();
    let { id, name, snumber } = router.query;

    const getTitle = () => {
        let title = seasondata.name ? seasondata.name : "";
        let year = seasondata.first_air_date
            ? " (" + getYear(seasondata.first_air_date) + ")"
            : "";
        let season = snumber ? " Season " + snumber : "";
        return "Watch " + title + season + " on ZFlix";
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
            <div className={styles.seasons_container}>
                <div className={styles.season_d_container}>
                    <div className={styles.s_poster}>
                        <Image
                            src={
                                data.poster_path
                                    ? "https://image.tmdb.org/t/p/w780" + data.poster_path
                                    : "/assets/image-not-found.png"
                            }
                            layout="fill"
                            placeholder="blur"
                            objectFit={data.poster_path ? "cover" : "contain"}
                            blurDataURL={"https://image.tmdb.org/t/p/w780" + data.poster_path}
                            alt={data.name}
                        />
                    </div>
                    <div className={styles.s_detail}>
                        <Link href={getLink(seasondata,"tv")}>
                            <a>
                                <h2 className={styles.title}>{seasondata.name}</h2>
                            </a>
                        </Link>
                        <p>Season {snumber}</p>
                        <p className={styles.date}>
                            <span>
                                <i className="bi bi-calendar-day"></i>{" "}
                            </span>
                            {getDate(data.air_date)}
                        </p>
                        <p className={styles.overview}>
                            {data.overview ? data.overview : "Overview not available"}
                        </p>
                    </div>
                </div>
                <EpisodeContainer data={data} title="Episodes" id={id} name={name} snumber={snumber} />
                <SeasonContainer data={seasondata.seasons} title="Seasons" id={id} name={name} />
            </div>
        </>
    );
}

export default TvSeason;
