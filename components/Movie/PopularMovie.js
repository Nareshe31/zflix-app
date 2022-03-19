import PosterWithDetails from "../atoms/PosterWithDetails";
import styles from "../../scss/components/movie/popular-movie.module.scss";
import { useState,useEffect } from "react";
import axios from 'axios'

const sortOptions = [
    { name: "Popularity Descending" },
    { name: "Popularity Ascending" },
    { name: "Rating Descending" },
    { name: "Rating Ascending" },
    { name: "Title (A-Z)" },
    { name: "Title (Z-A)" },
];

function PopularMovie({ data }) {
    const [sortBoxOpen, setsortBoxOpen] = useState(true);
    const [sortDropOpen, setsortDropOpen] = useState(false);
    const [currentSortOption, setcurrentSortOption] = useState(0);
    const [popularData, setpopularData] = useState([])
    const [popularTotalPages, setpopularTotalPages] = useState(0)
    const [currentPage, setcurrentPage] = useState(1)

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
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/popular?api_key=dfc43a605d906f9da6982495ad7bb34e&page=${currentPage+1}`
            );
            const data = await res.json();
            setpopularData(prev=>[...prev,...data.results])
            setcurrentPage(prev=>prev+1)
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
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
        <div className={styles.w_container}>
            <div className={styles.header_container}>
                <h2 className={styles.header}>Popular Movies</h2>
            </div>
            <div className={styles.content_container}>
                <div className={styles.filter_container}>
                    <div className={styles.sort_container}>
                        <div className={styles.main_drop_header} onClick={handleSortBox}>
                            <p>Sort</p>
                            {sortBoxOpen ? (
                                <span>
                                    <i class="bi bi-chevron-down"></i>
                                </span>
                            ) : (
                                <span>
                                    <i class="bi bi-chevron-right"></i>
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
                                            <i class="bi bi-chevron-down"></i>
                                        </span>
                                    ) : (
                                        <span id="drop-header">
                                            <i class="bi bi-chevron-right"></i>
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
                                        <div className={styles.option} id="drop-option" onClick={()=>selectSortOption(i)}>{item.name}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.w_p_container}>
                    <div className={styles.poster_container}>
                        {popularData?.map((item, i) => (
                            <PosterWithDetails item={item} type="movie" />
                        ))}
                    </div>
                    <div className={styles.load_more_container} onClick={getData}>
                        Load More
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopularMovie;
