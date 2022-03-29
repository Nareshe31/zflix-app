import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { covertToLinkWords, getYear, getDate } from "../utils/functions";
import { useRouter } from "next/router";
import styles from "../scss/components/navbar.module.scss";
import { useMediaQuery } from "react-responsive";
import LargeDeviceNavbar from "./Navbar/LargeDeviceNavbar";
import SmallDeviceNavbar from "./Navbar/SmallDeviceNavbar";

function Navbar() {
    const [moviesDropdown, setmoviesDropdown] = useState(false);
    const [tvshowsDropdown, settvshowsDropdown] = useState(false);
    const [searchShow, setsearchShow] = useState(false);
    const [query, setquery] = useState("");
    const inputRef = useRef();
    const inputSmRef = useRef();
    const navbarRef = useRef();
    const navbarSmRef = useRef();
    const [results, setresults] = useState({});
    const [searchContainerVisible, setsearchContainerVisible] = useState(false);
    const [currentSuggestion, setcurrentSuggestion] = useState(0);
    const [suggestionLoading, setsuggestionLoading] = useState(false);
    const [navSide, setnavSide] = useState(false);
    const [searchBarActive, setsearchBarActive] = useState(false);

    const router = useRouter();
    const { pathname } = router;

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
