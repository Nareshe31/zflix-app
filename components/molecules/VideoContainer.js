import styles from "../../scss/components/movie.module.scss";
import ScrollContainer from "react-indiana-drag-scroll";
import Image from "next/image";
import ContainerHeader from "../atoms/ContainerHeader";

function VideoContainer({ data,title }) {
    
    if (!data || (data && data.length==0))  return null

    return (
        <div className={styles.videos_container}>
            <ContainerHeader  title={title} />
            <ScrollContainer className={styles.videos}>
                {data.map((item, i) =>
                        <div key={i} className={styles.video_container}>
                            <a href={"https://www.youtube.com/watch?v="+item.key} target="_blank">
                                <div className={styles.video_thumbnail}>
                                    <Image
                                        src={"https://i.ytimg.com/vi/" + item.key + "/hqdefault.jpg"}
                                        layout="fill"
                                        placeholder="blur"
                                        objectFit="cover"
                                        blurDataURL={"https://i.ytimg.com/vi/" + item.key + "/hqdefault.jpg"}
                                        alt={item.name}
                                    />
                                    <div className={styles.yt_logo}>
                                        <span>
                                            <i className="bi bi-youtube"></i>
                                        </span>
                                    </div>
                                    <span className={styles.yt_bg}>

                                    </span>
                                </div>
                            </a>
                            <p>{item.name}</p>
                        </div>
                )}
            </ScrollContainer>
        </div>
    )

}

export default VideoContainer