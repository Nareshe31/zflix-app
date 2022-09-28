import Link from "next/link";
import Image from "next/image";
import {getDate,getLink } from "../../utils/functions";
import styles from "../../scss/components/navbar.module.scss";

function NavSearchTv({ item, currentSearchResult, index,hover, handleResultHover }) {
    return (
        <Link
            href={getLink(item,"tv")}
        >
            <a id={"result_"+index}>
                <li
                    className={styles.result}
                    onMouseEnter={() => hover?handleResultHover(index):null}
                >
                    <div className={styles.r_left}>
                        {item.poster_path ? (
                            <Image
                                src={"https://image.tmdb.org/t/p/w780" + item.poster_path}
                                layout="fill"
                                placeholder="blur"
                                objectFit="cover"
                                blurDataURL={
                                    "https://image.tmdb.org/t/p/w780" + item.poster_path
                                }
                                alt={item.name}
                            />
                        ) : (
                            <Image
                                src={"/assets/image-not-found.png"}
                                layout="fill"
                                placeholder="blur"
                                objectFit="contain"
                                blurDataURL={"/assets/image-not-found.png"}
                                alt={item.name + " image not found"}
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

export default NavSearchTv;
