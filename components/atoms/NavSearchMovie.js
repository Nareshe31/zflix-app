import Link from 'next/link';
import { covertToLinkWords, getYear, getDate } from "../../utils/functions";
import styles from "../../scss/components/navbar.module.scss";

function NavSearchMovie({ item,currentSearchResult,index,handleResultHover}) {
    return (
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
                <li
                    className={currentSearchResult==index?styles.result+" "+styles.active:styles.result}
                    onMouseEnter={()=>handleResultHover(index)}
                >
                    <div className={styles.r_left}>
                        {item.poster_path ? (
                            <img
                                src={"https://image.tmdb.org/t/p/original" + item.poster_path}
                                alt={item.title}
                                srcSet=""
                            />
                        ) : (
                            <img
                                className={styles.no_image}
                                alt={item.title + "image not found"}
                                src="/assets/image-not-found.png"
                            />
                        )}
                    </div>
                    <div className={styles.r_right}>
                        <p className={styles.title}>{item.title}</p>
                        <p>
                            <span style={{ marginRight: "5px" }}>
                                <i
                                    style={{ fontSize: "0.75rem" }}
                                    className="bi bi-calendar-day"
                                ></i>
                            </span>
                            {getDate(item.release_date)}
                        </p>
                        {/* <p>{item?.genre_ids?.map((item1, i) => (
                            <span className="genre">{item1} </span>
                        ))}
                    </p> */}
                        <p>
                            <span style={{ marginRight: "5px" }}>
                                <i
                                    style={{ fontSize: "0.75rem" }}
                                    className="bi bi-star-fill"
                                ></i>
                            </span>
                            {item.vote_average}
                        </p>
                        <p className={styles.media_type}>Movie</p>
                    </div>
                </li>
            </a>
        </Link>
    );
}

export default NavSearchMovie