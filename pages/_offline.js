import { useEffect } from "react";

export default function OfflinePage({ }) {

    return (
        <div
            className="offline_page"
            style={{
                width: "100%",
                height: "100vh",
                color: "#c2c2c2",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                padding: "10px 24px",
            }}
        >
            <div>
                <img
                    src="/offline-image.png"
                    width={250}
                    height={250}
                    alt=""
                    srcset=""
                />
                <h2 style={{ marginBottom: "4px", fontSize: "1.4rem" }}>
                    Oops, seems like you're offline!
                </h2>
                <p
                    style={{
                        color: "#b1b1b1",
                        fontSize: "0.925rem",
                        padding: "0px 12px",
                    }}
                >
                    This page cannot be displayed at the moment. Try once again later when
                    your internet connection improves!
                </p>
            </div>
        </div>
    );
}
