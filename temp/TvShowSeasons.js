import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getYear = (date) => {
  return date?.slice(0, 4);
};

const getMonth = (date) => {
  return months[date?.slice(5, 7) - 1];
};

function TvShowSeasons() {
  const [data, setdata] = useState({});
  const [seasondata, setseasondata] = useState({});
  let { id, name, season } = useParams();
  let seasonNo = String(season).split("-")[1];
  useEffect(() => {
    async function getAllResults() {
      await getSeasonData();
      await getData();
    }
    getAllResults();
    return () => { };
  }, []);

  const getSeasonData = async () => {
    try {
      var response = await axios.get(
        `
              https://api.themoviedb.org/3/tv/${id}?api_key=dfc43a605d906f9da6982495ad7bb34e&language=en-US&append_to_response=videos,credits`
      );
      setseasondata(response.data);
      document.title =
        response.data.name +
        " (" +
        getYear(response.data.first_air_date) +
        ")" +
        " Season " +
        seasonNo;
    } catch (error) {
      console.log("error");
    }
  };

  const getData = async () => {
    try {
      var response = await axios.get(
        `
              https://api.themoviedb.org/3/tv/${id}/season/${seasonNo}?api_key=dfc43a605d906f9da6982495ad7bb34e&language=en-US&append_to_response=videos,credits`
      );
      setdata(response.data);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="seasons-container">
      <div className="season-d-container">
        <div className="s-poster">
          <img
            src={"https://image.tmdb.org/t/p/original" + data.poster_path}
            alt=""
            srcset=""
          />
        </div>
        <div className="s-detail">
          <Link to={"/en/tv/"+id+"/"+name}><h2>{seasondata.name}</h2></Link>
          <p>Season {seasonNo}</p>
          <p className="overview">{data.overview}</p>
        </div>
      </div>
      <div className="episode-d-container">
        <div className="s-header">
          <h2>Episodes</h2>
          <div className="e-container">
            {data?.episodes?.map((item, i) => (
              <Link to={"/en/tv/"+id+"/"+name+"/"+season+"/episode-"+item.episode_number}>
                <div className="episode">
                  <div className="e-poster">
                    {item.still_path ? (
                      <img
                        src={
                          "https://image.tmdb.org/t/p/original" +
                          item.still_path
                        }
                        alt=""
                        srcset=""
                      />
                    ) : (
                      <img
                        src={"/assets/image-not-found.png"}
                        className="no-image"
                        alt=""
                        srcset=""
                      />
                    )}
                  </div>
                  <div className="e-detail">
                  <p className="e-name">{item.name}</p>

                    <p className="e-number">S{data.season_number} E{item.episode_number} <div className="e-dot"></div> {getMonth(item.air_date)}{" "}
                      {item?.air_date?.slice(8, 10)},{" "}
                      {getYear(item.air_date)}</p>
                    <p className="e-air-date"> 
                      
                    </p>
                    <p className="e-overview">{item.overview}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TvShowSeasons;
