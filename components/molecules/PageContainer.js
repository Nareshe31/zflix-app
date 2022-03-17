import Link from 'next/link'
import {useRouter} from 'next/router'
import styles from "../../scss/components/search.module.scss";


function PageContainer({page,link,total_pages}) {
    const Router=useRouter()
    let {q}=Router.query
    const generatePages=()=>{
        let a=[],i=page>1 && page<=total_pages-1 ?page-1:(page<=1?1:page-2)
        for (let j = i; j < i+3 && j<=total_pages; j++) {
            const element = <Link key={j} href={`${link}?q=${q}&page=${j}`}><a><div className={page==j?styles.page+" "+styles.active:styles.page}><span>{j}</span></div></a></Link>
            a.push(element)
        }
        return a
    }
    return(
        <div className={styles.page_container}>
            {page>1?
                <Link href={`${link}?q=${q}&page=${parseInt(page)-1}`}>
                    <a>
                        <div className={styles.arrow}>
                            <i className="bi bi-chevron-double-left"></i>
                        </div>
                    </a>
                </Link>
                :null
            }
            <div className={styles.pages_container}>
                {generatePages()}
            </div>
            {page<total_pages?
                <Link href={`${link}?q=${q}&page=${parseInt(page)+1}`}>
                    <a>
                        <div className={styles.arrow}>
                            <i className="bi bi-chevron-double-right"></i>
                        </div>
                    </a>
                </Link>
                :null
            }
        </div>
    )
}

export default PageContainer