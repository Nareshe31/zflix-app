import { useEffect } from "react";


function LoadingScreen({ }) {
    const loadContainer = {
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#000",
        position:"fixed",
        top:"0",
        zIndex:"10000",
        overflow:"hidden"
    };
    const imageStyle = {
        width: "80px",
        height: "80px",
        objectFit: "cover",
    };

    useEffect(() => {
      const body=document.body
      body.classList.add('no-scroll')
      return () => {
        body.classList.remove('no-scroll')
      }
    }, [])
    
    return (
        <section style={loadContainer}>
            <div>
                <img style={imageStyle} src="/assets/zflix-logo.png" alt="ZFlix Logo " srcSet="" />
            </div>
        </section>
    );
}

export default LoadingScreen;
