import Link from "next/link";
import Image from "next/image";
import styles from '../../scss/components/poster.module.scss';
import { motion } from "framer-motion";
import { getDate } from '../../utils/functions';

function PosterWithDetails({ item, type }) {
  const getYear = (date) => {
    return date?.slice(0, 4);
  };
  const removeSpecialCharacters = (title) => {
    return title.replace(/[&#,+()$~%'.":!*?<>{}]/g, "");
  };

  const covertToLinkWords = (title) => {
    var s = removeSpecialCharacters(title);
    return s.replace(/\s+/g, "-").toLowerCase();
  };

  const getHref=()=>{
    if (type === "movie") {
      return (
        "/en/movie/[id]/[name]")
      }
      else
      return (
        "/en/tv/[id]/[name]")
  }

  const getLink = () => {
    if (type === "movie") {
      return (
        "/en/movie/" +
        item.id +
        "/" +
        covertToLinkWords(type === "movie" ? item.title : item.name) +
        "-" +
        getYear(item.release_date)
      );
    } else
      return (
        "/en/tv/" +
        item.id +
        "/" +
        covertToLinkWords(type === "movie" ? item.title : item.name) +
        "-" +
        getYear(item.first_air_date)
      );
  };

  return (
    <>
      <Link href={getLink()} passHref> 
        <a className={styles.d_poster_link} >
        <motion.div 
          whileTap={{ scale: 0.9 }}
          className={styles.d_w_container}
        > 
          <div className={styles.d_poster_container}>
            <Image
              src={"https://image.tmdb.org/t/p/w780" + item.poster_path}
              layout="fill"
              placeholder="blur"
              objectFit="cover"
              blurDataURL={"https://image.tmdb.org/t/p/w780" + item.poster_path}
              alt={item.title}
            />
          </div>
          {/* <MovieInfo item={item} /> */}
        </motion.div>
        </a>
      </Link>
    </>
  );
}

function MovieInfo({item}){
  return (
    <div className={styles.d_poster_detail}>
      <p className={styles.title}>{item.title}</p>
      <p className={styles.date}>{getDate(item.release_date)}</p>
    </div>
  )
}

export default PosterWithDetails;
