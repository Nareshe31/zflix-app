import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/actions";
import styles from "../scss/components/profile.module.scss";
import Link from "next/link";
import {useRouter} from "next/router";

function Profile() {
    const dispatch = useDispatch();
    const router=useRouter()
    const { userData } = useSelector((state) => state.user);

    const logout = () => {
        localStorage.removeItem("token");
        // router.push('/en')
        window.location.href = window.location.origin + "/en";
        dispatch(logoutUser());
    };

    if (userData==null) {
        router.push('/en')
        return <></>
    }

    return (
        <div className={styles.profile_w_container}>
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
    );
}

export default Profile;
