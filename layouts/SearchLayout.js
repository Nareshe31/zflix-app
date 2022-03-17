import { useState,useEffect } from 'react';
import { useRouter } from "next/router";
import SearchInput from '../components/atoms/SearchInput'
import SearchResultTypes from '../components/molecules/SearchResultTypes'
import styles from "../scss/components/search.module.scss";

function SearchLayout({ children,total_results,active,link }) {
    const router = useRouter();
    const [query, setquery] = useState('')
    useEffect(() => {
        setquery(router.query.q?router.query.q:'')
        return () => {
        }
    }, [])

    const handleChangeQuery=(e)=>{
        setquery(e.target.value)
    }

    return (
        <div className={styles.search_container}>
            <SearchInput
                link={link}
                handleChangeQuery={handleChangeQuery}
                query={query}
            />
            <div className={styles.whole_results_container}>
                <SearchResultTypes
                    total_results={total_results}
                    active={active}
                    query={router.query.q}
                />
                {children}
            </div>
        </div>
    );
}
export default SearchLayout;
