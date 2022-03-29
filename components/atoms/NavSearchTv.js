import Link from 'next/link';
import { covertToLinkWords, getYear, getDate } from "../../utils/functions";
import styles from "../../scss/components/navbar.module.scss";

function NavSearchTv({ item }) {
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
                <li
                    className={styles.result}
                >
                    <div className={styles.r_left}>
                        {item.poster_path ? (
                            <img
                                src={"https://image.tmdb.org/t/p/original" + item.poster_path}
                                alt={item.name}
                                srcSet=""
                            />
                        ) : (
                            <img
                                className={styles.no_image}
                                alt={item.name + "image not found"}
                                src="/assets/image-not-found.png"
                            />
                        )}
                    </div>
                    <div className={styles.r_right}>
                        <p className={styles.title}>{item.name}</p>
                        <p>
                            <span style={{ marginRight: "5px" }}>
                                <i
                                    style={{ fontSize: "0.75rem" }}
                                    className="bi bi-calendar-day"
                                ></i>
                            </span>
                            {getDate(item.first_air_date)}
                        </p>
                        <p>
                            <span style={{ marginRight: "5px" }}>
                                <i
                                    style={{ fontSize: "0.8rem" }}
                                    className="bi bi-star-fill"
                                ></i>
                            </span>
                            {item.vote_average}
                        </p>
                        <p className={styles.media_type}>TV</p>
                    </div>
                </li>
            </a>
        </Link>
    );
}

export default NavSearchTv