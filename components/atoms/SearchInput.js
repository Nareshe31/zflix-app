import styles from "../../scss/components/search.module.scss";
import {useRouter} from 'next/router'
function SearchInput({link,handleChangeQuery,query}) {
    const router=useRouter()
    const handleSubmit=()=>{
        router.push(link+`?q=${query}`)
    }

    return(
        <div className={styles.search_input_container}>
            <form onSubmit={handleSubmit}>
                <input placeholder={query?'':'What are you looking for?'} type="text" value={query} onChange={handleChangeQuery} name="q" className={styles.search_input} id="" />    
            </form>    
        </div>
    )
}

export default SearchInput