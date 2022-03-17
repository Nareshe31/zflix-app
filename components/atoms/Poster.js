import Link from "next/link";
import Image from "next/image";
import styles from '../../scss/components/poster.module.scss';
import { motion } from "framer-motion";

function Poster({ item, type }) {
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
        <a className={styles.poster_link} >
        <motion.div 
          whileTap={{ scale: 0.9 }}
        > 
          <div className={styles.poster_container}>
            <Image
              src={"https://image.tmdb.org/t/p/w780" + item.poster_path}
              layout="fill"
              placeholder="blur"
              objectFit="cover"
              blurDataURL={"https://image.tmdb.org/t/p/w780" + item.poster_path}
              alt={item.title}
            />
          </div>
        </motion.div>
        </a>
      </Link>
    </>
  );
}

export default Poster;
