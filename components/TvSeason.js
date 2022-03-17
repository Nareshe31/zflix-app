import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { getYear, getMonth, getDate } from "../utils/functions";
import styles from "../scss/components/tv-season.module.scss";
import ScrollContainer from "react-indiana-drag-scroll";
import styles2 from '../scss/components/movie.module.scss';
import SeasonContainer from "./molecules/SeasonContainer";

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
    console.log(data);
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
                        <Link href={"/en/tv/" + id + "/" + name}>
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
                <div className={styles.episode_d_container}>
                <div className={styles2.c_header}>
                        <div className={styles2.h_line} />
                        <h2>Episodes</h2>
                        <div className={styles2.h_line} />
                    </div>
                    <ScrollContainer className="scroll-container" horizontal>
                        <div className={styles.e_container}>
                            {data?.episodes?.map((item, i) => (
                                <Link
                                    href={
                                        "/en/tv/" +
                                        id +
                                        "/" +
                                        name +
                                        "/season/" +
                                        snumber +
                                        "/episode/" +
                                        item.episode_number
                                    }
                                >
                                    <a>
                                        <div className={styles.episode}>
                                            <div className={styles.e_poster}>
                                                <Image
                                                    src={
                                                        item.still_path
                                                            ? "https://image.tmdb.org/t/p/w780" +
                                                            item.still_path
                                                            : "/assets/image-not-found.png"
                                                    }
                                                    layout="fill"
                                                    placeholder="blur"
                                                    objectFit={item.still_path ? "cover" : "contain"}
                                                    objectPosition={item.still_path ? "top" : "center"}
                                                    blurDataURL={
                                                        "https://image.tmdb.org/t/p/w780" + item.still_path
                                                    }
                                                    alt={data.title}
                                                />
                                            </div>
                                            <div className={styles.e_detail}>
                                                <p className={styles.e_name}>{item.name}</p>

                                                <p className={styles.e_number}>
                                                    S{data.season_number} E{item.episode_number}{" "}
                                                    <div className={styles.e_dot}></div>{" "}
                                                    {getMonth(item.air_date)}{" "}
                                                    {item?.air_date?.slice(8, 10)},{" "}
                                                    {getYear(item.air_date)}
                                                </p>
                                                <p className={styles.e_air_date}></p>
                                                <p className={styles.e_overview}>{item.overview}</p>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </ScrollContainer>
                </div>

                <SeasonContainer data={seasondata.seasons} title="Seasons" id={id} name={name} />
            </div>
        </>
    );
}

export default TvSeason;
