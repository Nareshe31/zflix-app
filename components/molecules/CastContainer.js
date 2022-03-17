import ScrollContainer from 'react-indiana-drag-scroll'
import CastPoster from '../atoms/CastPoster'
import styles2 from "../../scss/components/cast.module.scss";
import ContainerHeader from '../atoms/ContainerHeader';

function CastContainer({data,title,type}) {
    
    if (!data?.length) 
        return null

    return(
        <div className={styles2.content_c}>
            <ContainerHeader  title={title} />
            <ScrollContainer className="scroll-container" horizontal>
                <div className={styles2.c_container}>
                    {data.map((item, i) => (
                        <CastPoster type={type} item={item} key={i} />
                    ))}
                </div>
            </ScrollContainer>
        </div>
    )
}

export default CastContainer
