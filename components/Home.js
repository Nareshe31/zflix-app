import { useRouter } from "next/router";
import styles from "../scss/components/home.module.scss";
import Head from "next/head";
import Poster from "./atoms/Poster";
import ScrollContainer from "react-indiana-drag-scroll";
import { useEffect } from "react";
import Script from "next/script";
import Link from "next/link";

function Home({ movieData, tvData, personData, trendingData, base_url }) {
    const router = useRouter();
    let overview =
        "ZFlix is the largest free streaming platform for movies and tv shows. Collaborative media and info service featuring high quality content for a huge selection of titles and new releases! Available in all countries.";

    const shareDetails = {
        url: "http://localhost:3000/en",
        title: "ZFlix",
        text: "ZFlix is the largest free streaming platform for movies and tv shows.",
    };
    const handleSharing = async () => {
        if (navigator.share) {
            try {
                await navigator
                    .share(shareDetails)
                    .then(() =>
                        console.log("Hooray! Your content was shared to tha world")
                    );
            } catch (error) {
                console.log(`Oops! I couldn't share to the world because: ${error}`);
            }
        } else {
            // fallback code
            console.log(
                "Web share is currently not supported on this browser. Please provide a callback"
            );
        }
    };
    const getYear = (date) => {
        return date?.slice(0, 4);
    };

    useEffect(() => {
        $(document).ready(function () {
            $(".owl-carousel").owlCarousel({
                loop: true,
                margin: 10,
                lazyLoad: true,
                autoplay: true,
                nav: false,
                autoplayTimeout: 2500,
                autoplayHoverPause: true,
                items: 2,
            });
        });
    }, []);

    // useEffect(() => {
    //     window.webtor = window.webtor || [];
    //     window.webtor.push({
    //         id: 'player',
    //         magnet: 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F',
    //         on: function(e) {
    //             if (e.name == window.webtor.TORRENT_FETCHED) {
    //                 console.log('Torrent fetched!', e.data);
    //             }
    //             if (e.name == window.webtor.TORRENT_ERROR) {
    //                 console.log('Torrent error!');
    //             }
    //         },
    //         width:"100%",
    //         poster: 'https://via.placeholder.com/150/0000FF/808080',
    //         subtitles: [
    //             {
    //                 srclang: 'en',
    //                 label: 'test',
    //                 src: 'https://raw.githubusercontent.com/andreyvit/subtitle-tools/master/sample.srt',
    //                 default: true,
    //             }
    //         ],
    //         lang: 'en',
    //         i18n: {
    //             en: {
    //                 common: {
    //                     "prepare to play": "Preparing Video Stream... Please Wait...",
    //                 },
    //                 stat: {
    //                     "seeding": "Seeding",
    //                     "waiting": "Client initialization",
    //                     "waiting for peers": "Waiting for peers",
    //                     "from": "from",
    //                 },
    //             },
    //         },
    //     });

    //   return () => {

    //   }
    // }, [])

    const removeSpecialCharacters = (title) => {
        return title.replace(/[&#,+()$~%'.":!*?<>{}]/g, "");
      };
    
      const covertToLinkWords = (title) => {
        var s = removeSpecialCharacters(title);
        return s.replace(/\s+/g, "-").toLowerCase();
      };

      const getLink = (item) => {
        if (item.media_type === "movie") {
          return (
            "/en/movie/" +
            item.id +
            "/" +
            covertToLinkWords(item.title) +
            (item.release_date ? "-" + getYear(item.release_date) : "")
          );
        } else if (item.media_type === "tv")
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
    return (
        <>
            {/* <Script src="https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js" charset="utf-8" async></Script> */}
            <Head>
                <title>ZFlix - Watch Movies & TV Shows</title>
                <meta name="title" content={"ZFlix - Watch Movies & TV Shows"} />
                <meta name="description" content={overview} />
                <meta
                    name="keywords"
                    content="Movies, TV Shows, Streaming, Reviews, Actors, Actresses, Photos, User Ratings, Synopsis, Trailers, Teasers, Credits, Cast"
                />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={base_url + router.asPath} />
                <meta property="og:site_name" content="ZFlix" />
                <meta property="og:title" content={"ZFlix - Watch Movies & TV Shows"} />
                <meta property="og:description" content={overview} />
                <meta property="og:image" content="/icons/apple-touch-icon.png" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={base_url + router.asPath} />
                <meta
                    property="twitter:title"
                    content={"ZFlix - Watch Movies & TV Shows"}
                />
                <meta property="twitter:description" content={overview} />
                <meta
                    property="twitter:image"
                    content="/icons/apple-touch-icon.png"
                ></meta>
            </Head>
            <div className={styles.main_content}>
                <section className={styles.carousel_section}>
                    <div className="owl-carousel">
                        {trendingData.map((item) => (
                            <Link key={item.id} href={getLink(item)}>
                                <a>
                                <div  className={styles.carousel_card}>
                                    <img
                                        src={"https://image.tmdb.org/t/p/w1280" + item.backdrop_path}
                                        alt=""
                                        srcset=""
                                    />
                                    <div>
                                        <div className={styles.carousel_card_info_container}>
                                            <div className={styles.carousel_card_info}>
                                                <h4>
                                                    {item.media_type === "movie" ? item.title : item.name}
                                                </h4>
                                                <p>
                                                    {item.media_type === "movie"
                                                        ? getYear(item.release_date)
                                                        : getYear(item.first_air_date)}
                                                </p>
                                            </div>
                                            <div className={styles.carousel_card_type}>
                                                {item.media_type === "movie" ? "Movie" : "TV"}
                                            </div>
                                        </div>
                                    </div>
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
                        ))}
                    </div>
                </section>
                <section className={styles.section_main}>
                    <div className={styles.section_header}>
                        <h2 className={styles.heading}>Trending Movies</h2>
                        {/* <p>
                            Here are some of the most recent movies recommended by our
                            community
                        </p> */}
                    </div>
                    <div className={styles.whole_poster}>
                        {/* <ScrollContainer className="scroll-container" horizontal> */}
                        <div className={styles.poster_container}>
                            {movieData.map((item) => (
                                <Poster type="movie" key={item.id} item={item} />
                            ))}
                        </div>
                        {/* </ScrollContainer> */}
                    </div>
                </section>
                {/* <div id="player" className="webtor"></div> */}
                <section className={styles.section_main}>
                    <div className={styles.section_header}>
                        <h2 className={styles.heading}>Trending Shows</h2>
                        {/* <p>Here are some of the most recent tv shows recommended by our
                            community</p> */}
                    </div>
                    <div className={styles.whole_poster}>
                        <ScrollContainer className="scroll-container" horizontal>
                            <div className={styles.poster_container}>
                                {tvData.map((item) => (
                                    <Poster type="tv" key={item.id} item={item} />
                                ))}
                            </div>
                        </ScrollContainer>
                    </div>
                </section>

                {/* <section className={styles.section_main}>
                    <div className={styles.section_header}>
                        <h2 className={styles.heading}>Trending Persons</h2>
                        <p>Check out what everyone is talking about</p>
                    </div>
                    <div className={styles.whole_poster}>
                        <ScrollContainer className="scroll-container" horizontal>
                            <div
                                className={ styles.poster_container
                                }
                            >
                                {personData?.map((item) => (
                                    <Poster type="person" key={item.id} item={item} />
                                ))}
                            </div>
                        </ScrollContainer>
                    </div>
                </section> */}
            </div>
        </>
    );
}

export default Home;

/*
 <div className={styles.whole_poster} ref={movieSlideContainer}>
    {movieScrollLeft==0?
        null
        :
        <div className={styles.left_arrow+' '+styles.arrow} onClick={handleMovieSlideLeft}>
            <img src="./assets/left-arrow.png" className={styles.arrow_image} alt="" srcSet="" />
        </div>
    }
    <div className={styles.poster_container} ref={movieSlide}>
        {movieData.map((item) => (
            <Poster type="movie" key={item.id} item={item} />
        ))}
    </div>
    <div className={styles.right_arrow+' '+styles.arrow} onClick={handleMovieSlideRight}>
        <img src="./assets/right-arrow.png" className={styles.arrow_image} alt="" srcSet="" />
    </div>
</div>
*/
