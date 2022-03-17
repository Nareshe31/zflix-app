import Link from 'next/link'
import styles from "../../scss/components/search.module.scss";

function SearchResultTypes({ active,query,total_results }) {
    const types = [
        { title: "All", link: query?"/en/search?q="+query:"/en/search" },
        { title: "Movies", link: query?"/en/search/movie?q="+query:'/en/search/movie' },
        { title: "TV Shows", link: query?"/en/search/tv?q="+query:'/en/search/tv' },
        { title: "Persons", link:  query?"/en/search/person?q="+query:'/en/search/person' },
    ];
    return (
        <div className={styles.result_type_container}>
            <div className={styles.result_type}>
                <div className={styles.r_type_header}>Category</div>
                <div className={styles.r_types}>
                    {types.map((item, i) => (
                        <TypeBox item={item} key={i} total_results={total_results} active={active == i} count={i} />
                    ))}
                </div>
                
            </div>
            {active==1 || active==2?
                <div className={styles.search_tip}>
                    Tip: You can use the 'y:' filter to narrow your results by year. Example: 'star wars y:1977'.
                </div>
                :null
            }
        </div>
    );
}

function TypeBox({ item, count, active,total_results }) {
    return (
        <Link href={item.link}>
            <a>
                <div
                    className={active ? styles.r_type + " " + styles.active : styles.r_type}
                >
                    <div className={styles.r_type_name}>{item.title}</div>
                    <div className={active?styles.r_type_results:styles.r_type_results+" "+styles.not_active}>{active?total_results:''}</div>
                </div>
            </a>
        </Link>
    );
}

export default SearchResultTypes;
