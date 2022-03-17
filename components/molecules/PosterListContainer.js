import ScrollContainer from 'react-indiana-drag-scroll'
import styles from '../../scss/components/movie.module.scss'
import Poster from '../atoms/Poster'
import ContainerHeader from '../atoms/ContainerHeader';

function PosterListContainer({data,title,type}) {
    
    if (!data.length) 
        return null

    return(
        <div className={styles.recommendation_container}>
            <ContainerHeader  title={title} />
            <ScrollContainer className="scroll-container" horizontal>
                <div className={styles.r_poster_container}>
                    {data.map((item, i) => (
                        <Poster key={i} type={type} item={item} />
                    ))}
                </div>
            </ScrollContainer>
        </div>
    )
}

export default PosterListContainer
