import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ScrollContainer from "react-indiana-drag-scroll";

const getYear = (date) => {
  return date?.slice(0, 4);
};

function TvShow() {
  const [data, setdata] = useState({});
  const [watch, setwatch] = useState(false);
  const [season, setseason] = useState(1)
  const [seasonData, setseasonData] = useState({})

  let { id,name } = useParams();
  useEffect(() => {
    async function getAllResults() {
      await getData();
    }
    getAllResults();
    return () => { };
  }, [id]);

  useEffect(() => {
    getSeasonDetails()
    return () => {
      
    }
  }, [season])
  const getData = async () => {
    try {
      var response = await axios.get(
        `
          https://api.themoviedb.org/3/tv/${id}?api_key=dfc43a605d906f9da6982495ad7bb34e&language=en-US&append_to_response=videos,credits`
      );
      setdata(response.data);

      document.title =
        response.data.name +
        " (" +
        getYear(response.data.first_air_date) +
        ")";
    } catch (error) {
      console.log("error");
    }
  };
  const getSeasonDetails = async () => {
    try {
      var response = await axios.get(
        `
        https://api.themoviedb.org/3/tv/${id}/season/${season}}?api_key=dfc43a605d906f9da6982495ad7bb34e&language=en-US`
      );
      setseasonData(response.data);
      
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="w-content">
      {Object.keys(data).length ? (
        <div className={watch ? "content active" : "content"}>
          <div
            className="content-bg"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
            }}
          ></div>

          <div className="content-parent">
            <div className="content-hero">
              <div className="content-info">
                <div className="content-poster">
                  <img
                    src={"https://image.tmdb.org/t/p/w780" + data.poster_path}
                    alt=""
                    srcset=""
                  />
                </div>
                <div className="content-plot">
                  <h2 className="content-title">{data.name}</h2>
                  <p className="content-tagline">{data.tagline}</p>
                  <p className="content-details">
                    <i className="bi bi-calendar-day"></i>{" "}
                    {getYear(data.first_air_date)}
                    <span className="dot">.</span>
                    <span>
                      <i className="bi bi-star-fill"></i> {data.vote_average}
                    </span>
                    <span className="dot">.</span>
                    <span className="runtime">
                      <i className="bi bi-clock"></i> {data.runtime} mins
                    </span>
                  </p>
                  <div className="genres">
                    {data?.genres?.map((item, i) => (
                      <span className="genre">{item.name}</span>
                    ))}
                  </div>
                  <p className="content-overview">{data.overview}</p>
                  <div className="show">
                    <div className="watch-now" onClick={() => setwatch(true)}>
                      <i class="bi bi-play-fill"></i>
                      Watch Now
                    </div>
                    <div
                      className="show-trailer"
                      onClick={() => setwatch(true)}
                    >
                      Trailer
                    </div>
                  </div>
                </div>
              </div>
             
            </div>
            <div className="season-container">
                <div className="c-header">
                    <div className="h-line" />
                    <h2>Seasons</h2>
                    <div className="h-line" />
                  </div>
                <div className="season-dropdown">
                  <div className="seasons">
                      {data.seasons.map((item)=>{
                        return item.season_number!==0?
                        <Link to={"/en/tv/"+id+"/"+name+"/season-"+item.season_number}>
                        <div className="season">
                          <img src={"https://image.tmdb.org/t/p/w500"+item.poster_path} alt="" />
                          <div className="s-content">
                            <div className="s-no">Season {item.season_number}</div>
                            {/* <div className="s-overview">{item.overview}</div> */}
                            <p className="s-e-count">{item.episode_count} Episodes</p>
                          </div>
                        </div>
                        </Link>
                        :null
                      }
                      )}
                  </div>
                </div>
              </div>
            {data?.credits?.cast.length?
              <div className="content-c">
                  <div className="c-header">
                    <div className="h-line" />
                    <h2>Cast</h2>
                    <div className="h-line" />
                  </div>
                  <ScrollContainer className="c-container">
                    {data?.credits?.cast.map((item) => (
                      <div className="c-parent">
                        {item.profile_path ? (
                          <img
                            className="c-image"
                            src={
                              "https://image.tmdb.org/t/p/original" +
                              item.profile_path
                            }
                            alt=""
                          />
                        ) : (
                          <div className="no-image-container">
                            <img
                              className="no-image"
                              src="/assets/image-not-found.png"
                              alt="not found"
                              srcset=""
                            />
                          </div>
                        )}
                        <div className="c-detail">
                          <p className="c-name">{item.name}</p>
                          <p className="c-job">
                            <em>{item.character}</em>
                          </p>
                        </div>
                      </div>
                    ))}
                  </ScrollContainer>
                </div>
            :null}
              {data?.credits?.crew.length?
                <div className="content-c">
                  <div className="c-header">
                    <div className="h-line" />
                    <h2>Crew</h2>
                    <div className="h-line" />
                  </div>
                  <ScrollContainer className="c-container">
                    {data?.credits?.crew.map((item) => (
                      <div className="c-parent">
                        {item.profile_path ? (
                          <img
                            className="c-image"
                            src={
                              "https://image.tmdb.org/t/p/original" +
                              item.profile_path
                            }
                            alt=""
                          />
                        ) : (
                          <div className="no-image-container">
                            <img
                              className="no-image"
                              src="/assets/image-not-found.png"
                              alt="not found"
                              srcset=""
                            />
                          </div>
                        )}
                        <div className="c-detail">
                          <p className="c-name">{item.name}</p>
                          <p className="c-job">
                            <em>{item.job}</em>
                          </p>
                        </div>
                      </div>
                    ))}
                  </ScrollContainer>
                </div>
              :null}
              
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default TvShow;
