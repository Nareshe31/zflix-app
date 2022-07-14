import Link from "next/link";
import Image from "next/image";
import { covertToLinkWords, getYear, getDate } from "../../utils/functions";
import styles from "../../scss/components/navbar.module.scss";

function NavSearchPerson({
    item,
    currentSearchResult,
    index,
    handleResultHover,
}) {
    
    return (
        <Link
            href={
                "/en/person/" +
                item.id +
                "/" +
                covertToLinkWords(item.name)
            }
        >
            <a id={"result_"+index}>
                <li
                    className={styles.result}
                    onMouseEnter={() => handleResultHover(index)}
                >
                    <div className={styles.r_left}>
                        {item.profile_path ? (
                            <Image
                                src={"https://image.tmdb.org/t/p/w780" + item.profile_path}
                                layout="fill"
                                placeholder="blur"
                                objectFit="cover"
                                blurDataURL={
                                    "https://image.tmdb.org/t/p/w780" + item.profile_path
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
                        <p>{item.known_for_department}</p>
                        {/* <p>
                            <span style={{ marginRight: "5px" }}>
                                <i
                                    style={{ fontSize: "0.75rem" }}
                                    className="bi bi-calendar-day"
                                ></i>
                            </span>
                            {getDate(item.birthday)}
                        </p> */}
                        {/* <p>{item?.genre_ids?.map((item1, i) => (
                            <span className="genre">{item1} </span>
                        ))}
                    </p> */}
                        {/* <p>
                            <span style={{ marginRight: "5px" }}>
                                <i
                                    style={{ fontSize: "0.75rem" }}
                                    className="bi bi-star-fill"
                                ></i>
                            </span>
                            {item.vote_average}
                        </p> */}
                        <p className={styles.media_type}>Person</p>
                    </div>
                </li>
            </a>
        </Link>
    );
}

export default NavSearchPerson;
