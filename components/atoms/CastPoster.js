import styles from "../../scss/components/cast.module.scss";
import Image from "next/image";

function CastPoster({ item,type }) {
    
    return (
        <div className={styles.c_parent}>
            <div
                className={
                    item.profile_path
                        ? styles.c_image
                        : styles.c_image + " " + styles.no_image
                }
            >
                <Image
                    src={
                        item.profile_path
                            ? "https://image.tmdb.org/t/p/w780" + item.profile_path
                            : "/assets/image-not-found.png"
                    }
                    layout="fill"
                    placeholder="blur"
                    objectFit="cover"
                    blurDataURL={"https://image.tmdb.org/t/p/w780" + item.profile_path}
                    alt={item.title}
                />
            </div>
            <div className={styles.c_detail}>
                <p className={styles.c_name}>{item.name}</p>
                <p className={styles.c_job}>
                    <em>{type=="cast"?item.character:item.job}</em>
                </p>
            </div>
        </div>
    );
}

export default CastPoster