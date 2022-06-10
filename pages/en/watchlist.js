
function WatchlistPage({user}) {

    return(
        <div style={{"paddingTop":"100px"}}>
            <h2>Watchlist Page</h2>
        </div>
    )
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