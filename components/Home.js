import { useRouter } from "next/router";
import styles from "../scss/components/home.module.scss";
import Head from "next/head";
import Poster from "./atoms/Poster";
import ScrollContainer from "react-indiana-drag-scroll";
import { useEffect } from "react";
import Script from 'next/script'

function Home({ movieData, tvData,personData, base_url }) {
    const router = useRouter();
    let overview =
        "ZFlix is the largest free streaming platform for movies and tv shows. Collaborative media and info service featuring high quality content for a huge selection of titles and new releases! Available in all countries.";

    const shareDetails = { url:"http://localhost:3000/en", title:"ZFlix", text:"ZFlix is the largest free streaming platform for movies and tv shows." };
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
                <meta property="twitter:image" content="/icons/apple-touch-icon.png"></meta>
            </Head>
            <div className={styles.main_content}>
                <section className={styles.section_main}>
                    <div className={styles.section_header}>
                        <h2 className={styles.heading}>Trending Movies</h2>
                        <p>
                            Here are some of the most recent movies recommended by our
                            community
                        </p>
                    </div>
                    <div className={styles.whole_poster}>
                        <ScrollContainer className="scroll-container" horizontal>
                            <div
                                className={styles.poster_container
                                }
                            >
                                {movieData.map((item) => (
                                    <Poster type="movie" key={item.id} item={item} />
                                ))}
                            </div>
                        </ScrollContainer>
                    </div>
                </section>
                {/* <div id="player" className="webtor"></div> */}
                <section className={styles.section_main}>
                    <div className={styles.section_header}>
                        <h2 className={styles.heading}>Trending TV Shows</h2>
                        <p>Here are some of the most recent tv shows recommended by our
                            community</p>
                    </div>
                    <div className={styles.whole_poster}>
                        <ScrollContainer className="scroll-container" horizontal>
                            <div
                                className={ styles.poster_container
                                }
                            >
                                {tvData.map((item) => (
                                    <Poster type="tv" key={item.id} item={item} />
                                ))}
                            </div>
                        </ScrollContainer>
                    </div>
                </section>

                <section className={styles.section_main}>
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
                </section>
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
