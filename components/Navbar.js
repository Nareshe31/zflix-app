import { useMediaQuery } from "react-responsive";
import LargeDeviceNavbar from "./Navbar/LargeDeviceNavbar";
import SmallDeviceNavbar from "./Navbar/SmallDeviceNavbar";

function Navbar() {

    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 875px)",
    });
    const isMobile = useMediaQuery({
        query: "(max-width: 874px)",
    });
    const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
    const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });


    return (
        <>
            {isDesktopOrLaptop ? (
                <LargeDeviceNavbar />
            ) : null}
            {isMobile ? <SmallDeviceNavbar /> : null}
        </>
    );
}


export default Navbar;
