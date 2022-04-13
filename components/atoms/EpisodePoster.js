import Link from "next/link";
import { getYear, getMonth, getDate } from "../../utils/functions";
import styles from "../../scss/components/tv-season.module.scss";
import Image from "next/image";

function EpisodePoster({item,id,name,snumber,data}) {
    return(
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
            <a className={styles.episode_link}>
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
                            <span className={styles.e_dot}></span>{" "}
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
        
    )
}

export default EpisodePoster