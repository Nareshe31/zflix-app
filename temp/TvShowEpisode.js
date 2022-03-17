import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function TvShowEpisode() {
    const [data, setdata] = useState({});
    const [episodeData, setepisodeData] = useState({});
    let { id, name, season,episode } = useParams();
    let episodeNo = String(episode).split("-")[1];
    let seasonNo = String(season).split("-")[1];
    return(
        <div className="">
            <iframe frameBorder={0} webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" src={`https://www.2embed.ru/embed/tmdb/tv?id=${id}&s=${seasonNo}&e=${episodeNo}`} frameborder="0" title={id}></iframe>
        </div>
    )
}

export default TvShowEpisode