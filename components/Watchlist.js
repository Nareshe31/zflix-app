import { useSelector } from "react-redux";
import HeaderLayout from '../layouts/HeaderLayout'
import WatchlistPoster from "./atoms/WatchlistPoster";
import styles from '../scss/components/poster.module.scss';

function Watchlist({}) {

    const {userData}=useSelector(state=>state.user)

    return(
        <>
            <HeaderLayout title={"Watchlist - Zflix"}  />
            <div className={styles.watchlist_container}>
                <div style={{"marginBottom":"10px"}}>
                    <h2>Watchlist</h2>
                </div>
                <div style={{"minHeight":"70vh","position":"relative"}}>
                    {userData?.watchlist?.length?
                        <div style={{"display":"flex","flexWrap":"wrap"}}>
                            {userData.watchlist?.map((item, i) => (
                                <WatchlistPoster key={i} item={item.data} type={item.data.type} />
                            ))}
                        </div>
                        :
                        <div style={{"display":"flex","flexDirection":"column","justifyContent":"center","alignItems":"center","height":"70vh","padding":"0px 25px","textAlign":"center"}}>
                            <img src="/assets/add-icon.png" width={140} height={140} alt="" srcset="" />
                            <p style={{"marginTop":"10px","color":"#aaa","fontSize":"1.1rem"}}>Add movies or tv shows to get started</p>
                        </div>
                    }
                </div>
            </div>
        </>
    )
    
}

export default Watchlist