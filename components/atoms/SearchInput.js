import styles from "../../scss/components/search.module.scss";

function SearchInput({link,handleChangeQuery,query}) {
    
    return(
        <div className={styles.search_input_container}>
            <form action={link} method="get">
                <input placeholder={query?'':'What are you looking for?'} type="text" value={query} onChange={handleChangeQuery} name="q" className={styles.search_input} id="" />    
            </form>    
        </div>
    )
}

export default SearchInput