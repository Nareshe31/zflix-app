import { useState } from "react";
import Head from "next/head";
import { getYear } from '../utils/functions';
import Link from 'next/link';
import { useRouter } from "next/router";
import styles from '../scss/components/tv.module.scss';
import styles2 from '../scss/components/movie.module.scss';
import Image from "next/image";
import CastContainer from "./molecules/CastContainer";
import PosterListContainer from "./molecules/PosterListContainer";
import ImageListContainer from "./molecules/ImageListContainer";
import ImagePreview from "./atoms/ImagePreview";
import SeasonContainer from "./molecules/SeasonContainer";

function Tv({ data, base_url }) {
    const router = useRouter();
    const [imagePreview, setimagePreview] = useState(false);
    const [selectedImage, setselectedImage] = useState(0);

    let {id,name}=router.query

    const getTitle=()=>{
        let title = data.name ? data.name : "";
        let year = data.first_air_date ? " (" + getYear(data.first_air_date) + ")" : "";
        return title + year + " - ZFlix";
    }
    
    const imageSelect = (index) => {
        setimagePreview(true);
        setselectedImage(index);
        document.body.classList.add("no_scroll");
    };
    const previewClose = () => {
        document.body.classList.remove("no_scroll");
        setimagePreview(false);
    };
    return (
        <>
            <Head>
                <title>{getTitle()}</title>
                <meta name="title" content={getTitle()} />
                <meta name="description" content={data.overview} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={base_url + router.asPath} />
                <meta property="og:site_name" content="ZFlix" />
                <meta property="og:title" content={getTitle()} />
                <meta property="og:description" content={data.overview} />
                <meta
                    property="og:image"
                    content={"https://image.tmdb.org/t/p/w780" + data.poster_path}
                />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={base_url + router.asPath} />
                <meta property="twitter:title" content={getTitle()} />
                <meta property="twitter:description" content={data.overview} />
                <meta
                    property="twitter:image"
                    content={"https://image.tmdb.org/t/p/w780" + data.poster_path}
                ></meta>
            </Head>
            <div className={styles2.w_content}>
                <div className={styles2.content}>
                    <div
                        className={styles2.content_bg}
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
                        }}
                    ></div>

                    <div className={styles2.content_parent}>
                        <div className={styles2.content_hero}>
                            <div className={styles2.content_info}>
                                <div className={styles2.content_poster}>
                                    <div className={data.poster_path?styles2.content_poster_image:styles2.content_poster_image+' '+styles2.no_image}>
                                        <Image
                                            src={
                                                data.poster_path
                                                    ? "https://image.tmdb.org/t/p/w780" + data.poster_path
                                                    : "/assets/image-not-found.png"
                                            }
                                            layout="fill"
                                            placeholder="blur"
                                            objectFit={data.poster_path?"cover":"contain"}
                                            objectPosition={data.poster_path?"top":"center"}
                                            blurDataURL={
                                                "https://image.tmdb.org/t/p/w780" + data.poster_path
                                            }
                                            alt={data.title}
                                        />
                                    </div>
                                </div>
                                <div className={styles2.content_plot}>
                                    <h2 className={styles2.content_title}>{data.name}</h2>
                                    <p className={styles2.content_tagline}>{data.tagline}</p>
                                    <p className={styles2.content_details}>
                                        <i className="bi bi-calendar-day"></i>{" "}
                                        {getYear(data.first_air_date)}
                                        <span className={styles2.dot} ></span>
                                        <span>
                                            <i className="bi bi-star-fill"></i> {data.vote_average}
                                        </span>
                                        <span className={styles2.dot}></span>
                                        <span className={styles2.runtime}>
                                            <i className="bi bi-clock"></i> {data.runtime} mins
                                        </span>
                                    </p>
                                    <div className={styles2.genres}>
                                        {data?.genres?.map((item, i) => (
                                            <span key={i} className={styles2.genre}>{item.name}</span>
                                        ))}
                                    </div>
                                    <p className={styles2.content_overview}>{data.overview}</p>
                                    <div className={styles2.show}>
                                        <div className={styles2.watch_now} onClick={() => setwatch(true)}>
                                            <i class="bi bi-play-fill"></i>
                                            Watch Now
                                        </div>
                                        <div
                                            className={styles2.show_trailer}
                                            onClick={() => setwatch(true)}
                                        >
                                            Trailer
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <SeasonContainer data={data.seasons} id={id} name={name} title="Seasons"  />
                        <ImageListContainer data={data.images.backdrops} imageSelect={imageSelect} title="Images" />
                        <CastContainer type="cast" data={data.credits.cast} title="Cast" />
                        <CastContainer type="crew" data={data.credits.crew} title="Crew" />
                        <PosterListContainer type="tv" data={data.recommendations.results} title="More like this" />
                        <PosterListContainer type="tv" data={data.similar.results} title="Recommendations" />

                    </div>
                </div>
            </div>
            <ImagePreview selectedImage={selectedImage} data={data.images.backdrops} previewClose={previewClose} imagePreview={imagePreview} />
        </>
    );
}

export default Tv;
