import { useState } from "react";
import EpisodePoster from "../atoms/EpisodePoster";
import styles from "../../scss/components/tv-season.module.scss";
import ScrollContainer from "react-indiana-drag-scroll";
import styles2 from "../../scss/components/movie.module.scss";
import ContainerHeader from "../atoms/ContainerHeader";

function EpisodeContainer({ data, title, id, name, snumber }) {
    const [containerView, setcontainerView] = useState(true);

    const changeView = () => {
        setcontainerView((prev) => !prev);
    };

    if (!data?.episodes) return null;
    return (
        <div className={styles.episode_d_container}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <ContainerHeader title={title} />
                <span
                    onClick={changeView}
                    style={{ padding: "4px 10px", cursor: "pointer" }}
                >
                    {containerView ? (
                        <i class="bi bi-view-stacked"></i>
                    ) : (
                        <i class="bi bi-view-list"></i>
                    )}
                </span>
            </div>
            {containerView ? (
                <ScrollContainer className="scroll-container" horizontal>
                    <div className={styles.e_container}>
                        {data.episodes.map((item, i) => (
                            <EpisodePoster
                                item={item}
                                data={data}
                                key={i}
                                id={id}
                                name={name}
                                snumber={snumber}
                            />
                        ))}
                    </div>
                </ScrollContainer>
            ) : (
                <div className={styles.e_container+" "+styles.stack_view}>
                    {data.episodes.map((item, i) => (
                        <EpisodePoster
                            item={item}
                            data={data}
                            key={i}
                            id={id}
                            name={name}
                            snumber={snumber}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default EpisodeContainer;
