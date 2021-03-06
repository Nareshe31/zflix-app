import styles from "../../scss/components/cast.module.scss";
import Image from "next/image";
import Link from "next/link";

function CastPoster({ item,type }) {

    const removeSpecialCharacters = (title) => {
        return title.replace(/[&#,+()$~%'.":!*?<>{}]/g, "");
      };
    
      const covertToLinkWords = (title) => {
        var s = removeSpecialCharacters(item.name);
        return s.replace(/\s+/g, "-").toLowerCase();
      };
      const getLink=()=>{
        return (
            "/en/person/" +
            item.id +
            "/" +
            covertToLinkWords(item.name)
          )
      }
    return (
        
        <div className={styles.c_parent}>
            <Link href={getLink()}>
            <a>
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
            </a>
        </Link>
            <div className={styles.c_detail}>
                <Link href={getLink()}>
                <a>
                        <p className={styles.c_name}>{item.name}</p>
                        </a>
                </Link>
                <p className={styles.c_job}>
                    <em>{type=="cast"?item.character:item.job}</em>
                </p>
            </div>
        </div>
           
    );
}

export default CastPoster