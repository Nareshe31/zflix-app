import Image from "next/image";
import styles from "../../scss/components/poster.module.scss";

function Images({ item,imageSelect,index }) {
    return (
        <div>
            <div
                className={styles.i_poster_container}
                onClick={() => imageSelect(index)}
            >
                <Image
                    src={"https://image.tmdb.org/t/p/w780" + item.file_path}
                    layout="fill"
                    placeholder="blur"
                    objectFit="cover"
                    blurDataURL={"https://image.tmdb.org/t/p/w780" + item.file_path}
                    alt={item.title}
                />
            </div>
        </div>
    );
}

export default Images;
