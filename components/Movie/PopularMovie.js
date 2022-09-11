import { useRouter } from "next/router";
import PosterWithDetails from "../atoms/PosterWithDetails";
import styles from "../../scss/components/movie/popular-movie.module.scss";
import { useState,useEffect } from "react";
import Head from "next/head";
import axios from 'axios'

const sortOptions = [
    { name: "Popularity Descending" },
    { name: "Popularity Ascending" },
    { name: "Rating Descending" },
    { name: "Rating Ascending" },
    { name: "Title (A-Z)" },
    { name: "Title (Z-A)" },
];

function PopularMovie({ data ,base_url,filter_type,media_type,title}) {
    const [sortBoxOpen, setsortBoxOpen] = useState(true);
    const [sortDropOpen, setsortDropOpen] = useState(false);
    const [currentSortOption, setcurrentSortOption] = useState(0);
    const [popularData, setpopularData] = useState([])
    const [popularTotalPages, setpopularTotalPages] = useState(0)
    const [currentPage, setcurrentPage] = useState(1)
    const [loading, setloading] = useState(false)

    const router = useRouter();

    let overview =
        "ZFlix is the largest free streaming platform for movies and tv shows. Collaborative media and info service featuring high quality content for a huge selection of titles and new releases! Available in all countries.";

    useEffect(() => {
      
        window.addEventListener('click',(e)=>{
            if (sortDropOpen && e.target.id!=="drop-header" && e.target.id!=="drop-option") {
                setsortDropOpen(false)
            }
        })
      return () => {
        
      }
    }, [sortDropOpen])
    
    useEffect(() => {
        setpopularData(data.results)
        setcurrentPage(1)
        setpopularTotalPages(data.total_pages)
      return () => {
      }
    }, [])
    
    const getData=async()=>{
        try {
            setloading(true)
            const {data} = await axios.get(
                `https://api.themoviedb.org/3/${media_type}/${filter_type}?api_key=dfc43a605d906f9da6982495ad7bb34e&page=${currentPage+1}`
            );
            setloading(false)
            setpopularData(prev=>[...prev,...data.results])
            setcurrentPage(prev=>prev+1)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSortBox = () => {
        setsortDropOpen(false);
        setsortBoxOpen((prev) => !prev);
    };

    const selectSortOption=(i)=>{
        setcurrentSortOption(i)
        setsortDropOpen(false)
    }
    return (
        <>
            <Head>
                <title>{title} {media_type=="movie"?"Movies":"Shows"} - ZFlix</title>
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
                <meta property="og:image" content="/icons/apple-touch-icon.pngico" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={base_url + router.asPath} />
                <meta
                    property="twitter:title"
                    content={"ZFlix - Watch Movies & TV Shows"}
                />
                <meta property="twitter:description" content={overview} />
                <meta property="twitter:image" content="/icons/apple-touch-icon.pngico"></meta>
            </Head>
            <div className={styles.w_container}>
                <div className={styles.header_container}>
                    <h2 className={styles.header}>{title} {media_type=="movie"?"Movies":"Shows"}</h2>
                </div>
                <div className={styles.content_container}>
                    <div className={styles.filter_container}>
                        <div className={styles.sort_container}>
                            <div className={styles.main_drop_header} onClick={handleSortBox}>
                                <p>Sort</p>
                                {sortBoxOpen ? (
                                    <span>
                                        <i className="bi bi-chevron-down"></i>
                                    </span>
                                ) : (
                                    <span>
                                        <i className="bi bi-chevron-right"></i>
                                    </span>
                                )}
                            </div>
                            <div
                                className={
                                    sortBoxOpen
                                        ? styles.main_drop_content + " " + styles.active
                                        : styles.main_drop_content
                                }
                            >
                                <p>Sort Results By</p>
                                <div className={styles.dropdown}>
                                    <div
                                        className={styles.dropdown_current}
                                        onClick={() => setsortDropOpen((prev) => !prev)}
                                        id="drop-header"
                                    >
                                        <p id="drop-header">{sortOptions[currentSortOption].name}</p>
                                        {sortDropOpen ? (
                                            <span id="drop-header">
                                                <i className="bi bi-chevron-down"></i>
                                            </span>
                                        ) : (
                                            <span id="drop-header">
                                                <i className="bi bi-chevron-right"></i>
                                            </span>
                                        )}
                                    </div>
                                    <div
                                        className={
                                            sortDropOpen
                                                ? styles.dropdown_options + " " + styles.active
                                                : styles.dropdown_options
                                        }
                                    >
                                        {sortOptions.map((item,i)=>
                                            <div key={i} className={styles.option} id="drop-option" onClick={()=>selectSortOption(i)}>{item.name}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.w_p_container}>
                        <div className={styles.poster_container}>
                            {popularData?.map((item, i) => (
                                <PosterWithDetails key={i} item={item} type={media_type} />
                            ))}
                        </div>
                        <div className={styles.load_more_container} onClick={getData}>
                            {loading?"Loading":"Load More"}
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default PopularMovie;
