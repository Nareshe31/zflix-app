const { Fragment } = require("react");

function LoadingScreen({ }) {
    const loadContainer = {
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#000",
    };
    const imageStyle = {
        width: "80px",
        height: "80px",
        objectFit: "cover",
    };
    return (
        <section style={loadContainer}>
            <div>
                <img style={imageStyle} src="/assets/zflix-logo.png" alt="ZFlix Logo " srcSet="" />
            </div>
        </section>
    );
}

export default LoadingScreen;
