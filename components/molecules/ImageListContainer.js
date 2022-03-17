import styles from "../../scss/components/movie.module.scss";
import ContainerHeader from "../atoms/ContainerHeader";
import ScrollContainer from "react-indiana-drag-scroll";
import Image from "../atoms/Image";

function ImageListContainer({data,title,imageSelect}) {
    
    if(!data?.length)
        return null

    return(
        <div className={styles.recommendation_container}>
            <ContainerHeader title={title} />
            <ScrollContainer className="scroll-container" horizontal>
                <div className={styles.r_poster_container}>
                    {data.map((item, index) => (
                        <Image item={item} imageSelect={imageSelect} index={index} key={index} />
                    ))}
                </div>
            </ScrollContainer>
        </div>
    )
}

export default ImageListContainer