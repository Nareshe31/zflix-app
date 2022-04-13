import Link from "next/link";
import Image from "next/image";
import styles from "../../scss/components/tv.module.scss";

function SeasonPoster({item,id,name}) {
    
    const getLink="/en/tv/" + id + "/" + name + "/season/" + item.season_number
    return item.season_number !== 0 ? (
        <Link
            href={getLink}
        >
            <a className={styles.season_link}>
                <div className={styles.season}>
                    <img
                        src={"https://image.tmdb.org/t/p/w500" + item.poster_path}
                        alt=""
                    />
                    <div className={styles.s_content}>
                        <div >
                            <div className={styles.s_no}>
                                Season {item.season_number}
                            </div>
                            {/* <div className="s-overview">{item.overview}</div> */}
                            <p className={styles.s_e_count}>
                                {item.episode_count} Episodes
                            </p>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    ) : null;
}

export default SeasonPoster