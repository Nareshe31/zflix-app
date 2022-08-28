import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/actions";
import styles from "../scss/components/profile.module.scss";
import Link from "next/link";
import Router,{useRouter} from "next/router";
import { overview } from "../utils/functions";
import Head from "next/head";

function Profile() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state);
    const router=useRouter()
    const {userData}=user
    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = window.location.origin + "/en";
        dispatch(logoutUser());
    };
    
    if (typeof window!=="undefined" && user.userDataLoaded && userData===null) {
        Router.push('/en')
        return <></>
    }

    return ( 
        <>
        <Head>
                <title>Profile - ZFlix</title>
                <meta name="title" content={"ZFlix - Watch Movies & TV Shows"} />
                <meta name="description" content={overview} />
                <meta
                    name="keywords"
                    content="Movies, TV Shows, Streaming, Reviews, Actors, Actresses, Photos, User Ratings, Synopsis, Trailers, Teasers, Credits, Cast"
                />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={process.env.NEXT_PUBLIC_BACKEND_URI_V3 + router.asPath} />
                <meta property="og:site_name" content="ZFlix" />
                <meta property="og:title" content={"ZFlix - Watch Movies & TV Shows"} />
                <meta property="og:description" content={overview} />
                <meta property="og:image" content="/icons/apple-touch-icon.png" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={process.env.NEXT_PUBLIC_BACKEND_URI_V3 + router.asPath} />
                <meta
                    property="twitter:title"
                    content={"ZFlix - Watch Movies & TV Shows"}
                />
                <meta property="twitter:description" content={overview} />
                <meta property="twitter:image" content="/icons/apple-touch-icon.png"></meta>
            </Head>
            {userData &&<div className={styles.profile_w_container}>
            <div className={styles.profile_container}>
                <div className={styles.profile_image}>
                    <img src="/assets/avatar.png" alt="" srcset="" />
                </div>
                <div className={styles.profile_info}>
                    <p>{userData.name}</p>
                    <p>{userData.email}</p>
                </div>
                <div className={styles.option_box+" "+styles.option_box_d}>
                    <p>ZFlix Premium</p>
                    <p>Validity till: Lifetime validity</p>
                </div>
                <Link href="/en/u/watchlist">
                    <button className={styles.option_box}>
                        <span>Watchlist</span>
                        <span>
                            <i class="bi bi-chevron-right"></i>
                        </span>
                    </button>
                </Link>
                <button className={styles.option_box} onClick={logout}>
                    <span>Logout</span>
                    <span>
                        <i class="bi bi-chevron-right"></i>
                    </span>
                </button>
            </div>
            
        </div>
}
        </>
    );
}


export default Profile;
