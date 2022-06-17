import { useSelector } from "react-redux";
import HeaderLayout from '../layouts/HeaderLayout'
import WatchlistPoster from "./atoms/WatchlistPoster";

function Watchlist({}) {

    const {user}=useSelector(state=>state)

    return(
        <>
            <HeaderLayout title={"Watchlist - Zflix"}  />
            <div style={{"paddingTop":"90px","margin":"0 20px","color":"white"}}>
                <div>
                    <h2>Watchlist</h2>
                </div>
                <div>
                    <div style={{"display":"flex","flexWrap":"wrap"}}>
                        {user.userData.watchlist?.map((item, i) => (
                            <WatchlistPoster key={i} item={item.data} type={item.data.type} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
    
}

export default Watchlist