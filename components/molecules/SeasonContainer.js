import ContainerHeader from "../atoms/ContainerHeader";
import SeasonPoster from "../atoms/SeasonPoster";
import styles from "../../scss/components/tv.module.scss";
import ScrollContainer from "react-indiana-drag-scroll";

function SeasonContainer({ data,title,id,name}) {
    if (!data?.length) 
        return null
        
    return (
        <div className={styles.season_container}>
            <ContainerHeader  title={title} />
            <div className={styles.season_dropdown}>
                <ScrollContainer className="scroll-container" horizontal>
                    <div className={styles.seasons}>
                        {data.map((item, i) => 
                            <SeasonPoster item={item} id={id} name={name} key={i} />
                        )}
                    </div>
                </ScrollContainer>
            </div>
        </div>
    );
}

export default SeasonContainer
