import styles from "../../scss/components/movie.module.scss";

function ContainerHeader({title}) {    
    return(
        <div className={styles.c_header}>
            <div className={styles.h_line} />
            <h2>{title}</h2>
            <div className={styles.h_line} />
        </div>
    )
}

export default ContainerHeader