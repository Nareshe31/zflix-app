import Head from "next/head";
import { useRouter } from "next/router";

const overview ="ZFlix is the largest free streaming platform for movies and tv shows. Collaborative media and info service featuring high quality content for a huge selection of titles and new releases! Available in all countries.";
const base_url="https://zflix-app.netlify.app"

// ZFlix - Watch Movies & TV Shows
function HeaderLayout({title}) {
    const router=useRouter()

    return (
        <Head>
            <title>{title}</title>
            <meta name="title" content={"ZFlix - Watch Movies & TV Shows"} />
            <meta name="description" content={overview} />
            <meta
                name="keywords"
                content="Movies, TV Shows, Streaming, Reviews, Actors, Actresses, Photos, User Ratings, Synopsis, Trailers, Teasers, Credits, Cast"
            />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={base_url + router.asPath} />
            <meta property="og:site_name" content="ZFlix" />
            <meta property="og:title" content={"ZFlix - Watch Movies & TV Shows"} />
            <meta property="og:description" content={overview} />
            <meta property="og:image" content="/icons/apple-touch-icon.png" />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={base_url + router.asPath} />
            <meta
                property="twitter:title"
                content={"ZFlix - Watch Movies & TV Shows"}
            />
            <meta property="twitter:description" content={overview} />
            <meta property="twitter:image" content="/icons/apple-touch-icon.png"></meta>
        </Head>
    )
}

export default HeaderLayout