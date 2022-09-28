import Link from "next/link";
import Image from "next/image";
import styles from '../../scss/components/poster.module.scss';
import { motion } from "framer-motion";
import { getYear,getLink } from '../../utils/functions';

function WatchlistPoster({ item, type }) {

  const getHref=()=>{
    if (type === "movie") {
      return (
        "/en/movie/[id]/[name]")
      }
      else
      return (
        "/en/tv/[id]/[name]")
  }

  function MoviePosterInfo({item}) {
    
    return(
      <div className={styles.poster_info}>
          <p className={styles.title}>{item.name}</p>
          <p className={styles.overview}>{getYear(item.year)}</p>
          <p className={styles.overview}>{item.overview}</p>
          {
            (new Date())>(new Date(item.year))?          
              <Link href={getLink({...item,title:item.name,release_date:item.year},type)+"/watch"}>
                <div className={styles.watch_now}>
                  <i className="bi bi-play-fill"></i>
                  Watch Now
                </div>
              </Link>
            :
            null
          }
      </div>
    )
  }
  function TvPosterInfo({item}) {
    
    return(
      <div className={styles.poster_info}>
          <p className={styles.title}>{item.name}</p>
          <p className={styles.overview}>{getYear(item.year)}</p>
          <p className={styles.overview}>{item.overview}</p>
          {
            (new Date())>(new Date(item.year))?          
              <Link href={getLink({...item,first_air_date:item.year},type)+"/season/1/episode/1"}>
                <div className={styles.watch_now}>
                  <i className="bi bi-play-fill"></i>
                  Watch Now
                </div>
              </Link>
            :
            null
          }
      </div>
    )
  }

  return (
    <>
      <Link href={getLink({...item,title:item.name,release_date:item.year,first_air_date:item.year},type)} passHref> 
        <a className={styles.d_poster_link+" "+styles.poster_no_margin+" "+styles.poster_link} >
        <motion.div 
          // whileTap={{ scale: 0.9 }}
          whileHover={{scale:1.075}}
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
            {type==="movie"?<MoviePosterInfo item={item} />:(type==="tv"?<TvPosterInfo item={item} />:<PersonPosterInfo item={item} />)}
          </div>
          {/* <MovieInfo item={item} /> */}
        </motion.div>
        </a>
      </Link>
    </>
  );
}

export default WatchlistPoster;
