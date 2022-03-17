import styles from "../../scss/components/movie.module.scss";

function ImagePreview({imagePreview,selectedImage,previewClose,data }) {

    if(!imagePreview)
        return null
    return (
        <div className={styles.i_preview_container} onClick={previewClose}>
            <div className={styles.options_container}>
                {/* <div className={styles.i_download} onClick={previewClose}>
                            <Link
                                href={
                                    "https://image.tmdb.org/t/p/original" +
                                    data[selectedImage].file_path
                                }
                                download
                            >
                                Save
                            </Link>
                        </div> */}
                <div className={styles.i_close} onClick={previewClose}>
                    <i className="bi bi-x"></i>
                </div>
            </div>
            <div className={styles.i_poster_container}>
                <img
                    onClick={(e) => e.stopPropagation()}
                    className={styles.i_poster}
                    src={
                        "https://image.tmdb.org/t/p/original" +
                        data[selectedImage].file_path
                    }
                    alt=""
                    srcset=""
                />
            </div>
        </div>
    );
}

export default ImagePreview