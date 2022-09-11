import Watchlist from "../../../components/Watchlist"

function WatchlistPage({}) {

    return <Watchlist  />
}

export async function getServerSideProps(context) {
    try {
        return {
            props:{
                base_url: process.env.BASE_URL,
            }
        }
    } catch (error) {
        return {
            notFound:true
        }
    }
}


export default WatchlistPage