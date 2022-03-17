import Link from 'next/link'
import Image from 'next/image'
import {
    getYear,
    getDate,
    covertToLinkWords,
} from "../../utils/functions";
import styles from "../../scss/components/search.module.scss";

function SearchResultMovie({ item }) {
    return (
        <div className={styles.result_box} key={item.id}>
            <Link
                href={
                    "/en/movie/" +
                    item.id +
                    "/" +
                    covertToLinkWords(item.title) +
                    "-" +
                    getYear(item.release_date)
                }
            >
                <a>
                    <div className={item.poster_path?styles.result_image:(styles.result_image+' '+styles.no_image)}>
                        <Image
                            src={
                                item.poster_path
                                    ? "https://image.tmdb.org/t/p/w780" + item.poster_path
                                    : "/assets/image-not-found.png"
                            }
                            layout="fill"
                            placeholder="blur"
                            objectFit={item.poster_path?"cover":"contain"}
                            blurDataURL={"https://image.tmdb.org/t/p/w780" + item.poster_path}
                            alt={item.title}
                        />
                    </div>
                </a>
            </Link>
            <div className={styles.result_detail}>
                <Link
                    href={
                        "/en/movie/" +
                        item.id +
                        "/" +
                        covertToLinkWords(item.title) +
                        "-" +
                        getYear(item.release_date)
                    }
                >
                    <a>
                        <p className={styles.result_title}>{item.title}</p>
                    </a>
                </Link>
                <p className={styles.result_tagline}>{item.tagline}</p>
                <p className={styles.result_date}>
                    <span>
                        <i className="bi bi-calendar-day"></i>
                    </span>
                    {getDate(item.release_date)}
                </p>
                <p className={styles.result_overview}>{item.overview}</p>
                <Link
                    href={
                        "/en/movie/" +
                        item.id +
                        "/" +
                        covertToLinkWords(item.title) +
                        "-" +
                        getYear(item.release_date) +
                        "/watch"
                    }
                >
                    <a>
                        <div className={styles.watch_now}>
                            <span>
                                <i className="bi bi-play-fill"></i>
                            </span>
                            Watch Now
                        </div>
                    </a>
                </Link>
                <p className={styles.result_type}>Movie</p>
            </div>
        </div>
    );
}
export default SearchResultMovie