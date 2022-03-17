import axios from "axios"
import TorrentSearch from "../../../components/Torrent"

function TorrentPage({base_url}) {
    return <TorrentSearch base_url={base_url} />
}

export async function getServerSideProps(context) {
    try {
        axios.post("https://zflix-backend.herokuapp.com/api/v2/add-page-request",{url:context.resolvedUrl})
        return {
            props:{
                base_url: process.env.BASE_URL
            }
        }
    } catch (error) {
        return {
            notFound:true
        }
    }
}

export default TorrentPage