import TorrentSearchApi from "torrent-search-api";

const providers2 = [
    "Yts",
    "1337x",
    "Eztv",
    "KickassTorrents",
    "Limetorrents",
    "Rarbg",
    "ThePirateBay",
    "TorrentProject",
    "Torrentz2",
];

export default async function handler(req, res) {
    try {
        if (req.method!=="POST") {
            let error=new Error("Request is not allowed")
            throw error
        }
        TorrentSearchApi.enablePublicProviders(
        "Yts",
        "1337x",
        "Eztv",
        "KickassTorrents",
        "Limetorrents",
        "Rarbg",
        "ThePirateBay",
        "TorrentProject",
        "Torrentz2");
        let {providers,query,type}=req.body
        if (!(providers && query && type )) {
            let error=new Error("Parameters are required")
            throw error
        }
        let result = await TorrentSearchApi.search(
            providers,
            query,
            type
        );
        res.send({
            results: result,
            total_results: result.length,
            query:query
        });
        }
       
    catch (error) {
        res.status(400).send({ message: "An error occurred", error: error.message });
    }
}
