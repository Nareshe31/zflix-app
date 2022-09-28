import { useEffect } from "react";
import { useSelector } from "react-redux";


function LoadingScreen({ }) {
    const {user}=useSelector(state=>state)
    const loadContainer = {
        width: "100vw",
        height: "100%",
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
    //   body.classList.add('no-scroll')
    document.querySelector('body').style.overflow="hidden"
      setTimeout(() => {
        if (!user.userDataLoaded) {
          try {
            document.querySelector(".loading-image-container").style.display="none"
            document.querySelector(".lds-ring").style.display="inline-block"

          } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
          }
        }
      }, 750);
      return () => {
        // body.classList.remove('no-scroll')
      }
    }, [])
    
    return (
        <section style={loadContainer}>
            <div className="loading-image-container">
                <img style={imageStyle} src="/assets/zflix-logo.png" alt="ZFlix Logo " srcSet="" />
            </div>
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </section>
    );
}

export default LoadingScreen;
