import Link from 'next/link'
import Image from 'next/image'
import {
    getYear,
    getDate,
    covertToLinkWords,
} from "../../utils/functions";
import styles from "../../scss/components/search.module.scss";

function SearchResultTv({ item }) {
    return (
        <Link
            href={
                "/en/tv/" +
                item.id +
                "/" +
                covertToLinkWords(item.name) +
                "-" +
                getYear(item.first_air_date)
            }
        >
            <a>
                <div className={styles.result_box} key={item.id}>
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
                            alt={item.name}
                        />
                    </div>
                    <div className={styles.result_detail}>
                        <p className={styles.result_title}>{item.name}</p>
                        <p className={styles.result_date}>
                            <span>
                                <i className="bi bi-calendar-day"></i>
                            </span>
                            {getDate(item.first_air_date)}
                        </p>
                        <p className={styles.result_tagline}>{item.tagline}</p>
                        <p className={styles.result_overview}>{item.overview}</p>
                        <p className={styles.result_type}>TV Show</p>
                    </div>
                </div>
            </a>
        </Link>
    );
}
export default SearchResultTv