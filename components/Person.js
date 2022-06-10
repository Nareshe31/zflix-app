import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import PosterListContainer from "./molecules/PosterListContainer";
import styles from "../scss/components/person.module.scss";
import ScrollContainer from "react-indiana-drag-scroll";

function Person({ data, base_url }) {
    
    const router = useRouter();

    function getTitle() {
        return data.name + " - ZFlix";
    }

    return (
        <>
            <Head>
                <title>{getTitle()}</title>
                <meta name="title" content={getTitle()} />
                <meta name="description" content={data.biography} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={base_url + router.asPath} />
                <meta property="og:site_name" content="ZFlix" />
                <meta property="og:title" content={getTitle()} />
                <meta property="og:description" content={data.biography} />
                <meta
                    property="og:image"
                    content={"https://image.tmdb.org/t/p/w780" + data.profile_path}
                />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={base_url + router.asPath} />
                <meta property="twitter:title" content={getTitle()} />
                <meta property="twitter:description" content={data.biography} />
                <meta
                    property="twitter:image"
                    content={"https://image.tmdb.org/t/p/w780" + data.profile_path}
                ></meta>
            </Head>
            <div className={styles.w_container}>
                <div className={styles.person_info_container}>
                    {/* <div className={styles.bg_image} style={{"backgroundImage":`url(https://image.tmdb.org/t/p/w780${data.profile_path})`}}>
                    </div> */}
                    <div className={styles.person_poster}>
                        <div className={styles.poster_container}>
                            <Image
                                src={"https://image.tmdb.org/t/p/w780" + data.profile_path}
                                layout="fill"
                                placeholder="blur"
                                objectFit="cover"
                                blurDataURL={
                                    "https://image.tmdb.org/t/p/w780" + data.profile_path
                                }
                                alt={data.name}
                            />
                        </div>
                    </div>
                    <div className={styles.person_info}>
                        <h2 className={styles.name}>{data.name}</h2>
                        <p className={styles.department}>{data.known_for_department}</p>
                        <p className={styles.biography}>{data.biography}</p>
                    </div>
                </div>
                <section>
                    <PosterListContainer
                        type="movie"
                        data={data.movie_credits.cast}
                        title="Movies (Cast)"
                    />
                </section>
                <section>
                    <PosterListContainer
                        type="movie"
                        data={data.movie_credits.crew}
                        title="Movies (Crew)"
                    />
                </section>
                <section>
                    <PosterListContainer
                        type="tv"
                        data={data.tv_credits.cast}
                        title="Tv Shows (Cast)"
                    />
                </section>
                <section>
                    <PosterListContainer
                        type="tv"
                        data={data.tv_credits.crew}
                        title="Tv Shows (Crew)"
                    />
                </section>
            </div>
        </>
    );
}

export default Person;
