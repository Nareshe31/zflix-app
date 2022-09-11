import styles from "../../scss/components/search.module.scss";
import {useRouter} from 'next/router'
function SearchInput({link,handleChangeQuery,query,clearQuery}) {
    const router=useRouter()
    const handleSubmit=(e)=>{
        e.preventDefault()
        router.push(link+`?q=${query}`)
    }

    return(
        <div className={styles.search_input_container}>
            <form onSubmit={handleSubmit}>
                <div className={styles.input_container}> 
                    <input placeholder={query?'':'What are you looking for?'} type="text" value={query} onChange={handleChangeQuery} name="q" className={styles.search_input} id="" />    
                    {
                        query!==""?
                        <span onClick={clearQuery}>
                            <i class="bi bi-x-lg"></i>
                        </span>
                        :
                        null
                    }
                </div>
                <span onClick={handleSubmit} className={styles.search_icon}>
                    <i class="bi bi-search"></i>
                </span>
            </form>    
        </div>
    )
}

export default SearchInput