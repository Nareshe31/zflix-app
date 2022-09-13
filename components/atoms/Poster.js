import Link from "next/link";
import Image from "next/image";
import styles from "../../scss/components/poster.module.scss";
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

  const getHref = () => {
    if (type === "movie") {
      return "/en/movie/[id]/[name]";
    } else return "/en/tv/[id]/[name]";
  };

  const getLink = () => {
    if (type === "movie") {
      return (
        "/en/movie/" +
        item.id +
        "/" +
        covertToLinkWords(item.title) +
        (item.release_date ? "-" + getYear(item.release_date) : "")
      );
    } else if (type === "tv")
      return (
        "/en/tv/" +
        item.id +
        "/" +
        covertToLinkWords(item.name) +
        (item.first_air_date ? "-" + getYear(item.first_air_date) : "")
      );
    else {
      return "/en/person/" + item.id + "/" + covertToLinkWords(item.name);
    }
  };
  function MoviePosterInfo({ item }) {
    return (
      <div className={styles.poster_info}>
        <Link href={getLink()}>
          <a>
            <p title={item.title} className={styles.title}>
              {item.title}
            </p>
          </a>
        </Link>
        <p className={styles.year}>{getYear(item.release_date)}</p>
        <p className={styles.overview}>{item.overview}</p>
        {/* {new Date() > new Date(item.release_date) ? (
          <Link href={getLink() + "/watch"}>
            <div className={styles.watch_now}>
              <i className="bi bi-play-fill"></i>
              Watch Now
            </div>
          </Link>
        ) : null} */}
      </div>
    );
  }
  function TvPosterInfo({ item }) {
    return (
      <div className={styles.poster_info}>
        <Link href={getLink()}>
          <a>
            <p title={item.name} className={styles.title}>
              {item.name}
            </p>
          </a>
        </Link>
        <p className={styles.year}>{getYear(item.first_air_date)}</p>
        <p className={styles.overview}>{item.overview}</p>
        {/* {new Date() > new Date(item.first_air_date) ? (
          <Link href={getLink() + "/season/1/episode/1"}>
            <div className={styles.watch_now}>
              <i className="bi bi-play-fill"></i>
              Watch Now
            </div>
          </Link>
        ) : null} */}
      </div>
    );
  }
  function PersonPosterInfo({ item }) {
    return (
      <div className={styles.poster_info}>
        <Link href={getLink()}>
          <a>
            <p title={item.name} className={styles.title}>
              {item.name}
            </p>
          </a>
        </Link>
        <p className={styles.year}>{item.known_for_department}</p>

        <p className={styles.overview}>{item.overview}</p>
      </div>
    );
  }

  const imageURL =
    type === "movie" || type === "tv" ? item.poster_path : item.profile_path;
  return (
    <div className={styles.poster_link}>

          <div className={styles.poster_container}>
            <Image
              src={
                imageURL
                  ? "https://image.tmdb.org/t/p/w780" + imageURL
                  : "/assets/image-not-found.png"
              }
              layout="fill"
              placeholder="blur"
              objectFit={imageURL ? "cover" : "contain"}
              objectPosition={imageURL ? "top" : "center"}
              blurDataURL={
                "https://image.tmdb.org/t/p/w780" +
                (type === "movie" || type === "tv"
                  ? item.poster_path
                  : item.profile_path)
              }
              alt={type === "movie" ? item.title : item.name}
            />
                  <Link href={getLink()} passHref>
        <a title={type === "movie" ? item.title : item.name}>
            <div className={styles.poster_hover_container}>
              <button title="Play">
                <svg
                  data-name="Layer 1"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M330.61 225.16 217 159.57c-23.74-13.71-53.41 3.42-53.41 30.84v131.18c0 27.42 29.67 44.55 53.41 30.84l113.61-65.59c23.74-13.71 23.74-47.97 0-61.68Z"
                    fill="none"
                    stroke="#ffffffdd"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="20px"
                    class="stroke-083b43"
                  ></path>
                </svg>
              </button>
            </div>
            </a>
      </Link>
            <p title="Rating" className={styles.rating}>
              <span>
                <i className="bi bi-star-fill"></i>
              </span>
              {Number(item.vote_average).toPrecision(2)}
            </p>
            <span title="Add to watchlist" className={styles.bookmark}>
              <i className="bi bi-bookmark"></i>
            </span>
          </div>
        
      {type === "movie" ? (
        <MoviePosterInfo item={item} />
      ) : type === "tv" ? (
        <TvPosterInfo item={item} />
      ) : (
        <PersonPosterInfo item={item} />
      )}
      {/* </motion.div> */}
    </div>
  );
}

export default Poster;
