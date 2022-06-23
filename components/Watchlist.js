import { useSelector } from "react-redux";
import HeaderLayout from '../layouts/HeaderLayout'
import WatchlistPoster from "./atoms/WatchlistPoster";
import styles from '../scss/components/poster.module.scss';
import { useRouter } from "next/router";

function Watchlist({}) {

    const {userData}=useSelector(state=>state.user)
    const router=useRouter()

    if (userData==null) {
        router.push('/en')
        return <></>
    }

    return(
        <>
            <HeaderLayout title={"Watchlist - Zflix"}  />
            <div className={styles.watchlist_container}>
                <div style={{"marginBottom":"10px"}}>
                    <h2>Watchlist</h2>
                </div>
                <div>
                    <div style={{"display":"flex","flexWrap":"wrap"}}>
                        {userData.watchlist?.map((item, i) => (
                            <WatchlistPoster key={i} item={item.data} type={item.data.type} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
    
}

export default Watchlist