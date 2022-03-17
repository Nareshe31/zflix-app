import axios from "axios"
import TorrentSearch from "../../../components/Torrent"

function TorrentPage({base_url}) {
    return <TorrentSearch base_url={base_url} />
}

export async function getServerSideProps(context) {
    try {
        let {req}=context
        let ip=req.headers['x-real-ip'] || req.connection.remoteAddress
        axios.post("https://zflix-backend.herokuapp.com/api/v2/add-page-request",{url:context.resolvedUrl,ip_address:ip})
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