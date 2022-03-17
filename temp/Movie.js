import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams,useNavigate } from "react-router-dom";
import ScrollContainer from "react-indiana-drag-scroll";
import Poster from "./molecules/Poster";


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

const getHour = (runtime) => {
  return " "+Math.floor(runtime / 60).toString();
};
const getMinute = (runtime) => {
  return runtime % 60;
};

function convertMoney(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? Number(Math.abs(Number(labelValue) / 1.0e9).toFixed(2)) + " billion"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
      ? Number(Math.abs(Number(labelValue) / 1.0e6).toFixed(2)) + " million"
      : // Three Zeroes for Thousands
      Math.abs(Number(labelValue)) >= 1.0e3
        ? Number(Math.abs(Number(labelValue) / 1.0e3).toFixed(2)) + " thousand"
        : Math.abs(Number(labelValue));
}

function Movie() {
  const [data, setdata] = useState({});
  const [watch, setwatch] = useState(false);
  const [loading, setloading] = useState(true);
  const [torrents, settorrents] = useState({})
  const navigate = useNavigate();

  let { id,name } = useParams();
  useEffect(() => {
    setdata({})
    settorrents({})
    setloading(true)
    async function getAllResults() {
      await getData();
    }
    getAllResults();
    return () => { };
  }, [id]);

  const getData = async () => {
    try {
      var response = await axios.get(
        `
          https://api.themoviedb.org/3/movie/${id}?api_key=dfc43a605d906f9da6982495ad7bb34e&language=en-US&append_to_response=videos,credits,recommendations,similar`
      );
      console.log(response.data);
      setdata(response.data);
      setloading(false);
      getTorrents(response.data)
      document.title =
        response.data.title + " (" + getYear(response.data.release_date) + ")";
    } catch (error) {
      console.log("error");
    }
  };

  const getTorrents = async (data) => {
    try {
      var response = await axios.get(
        `
        https://important-bow-prawn.glitch.me/api/v2/torrent/movie/${data.title} ${getYear(data.release_date)}`
      );
      settorrents(response.data)
    } catch (error) {
      console.log("Cannot find torrents");
    }
  };

  const watchNow=()=>{
    navigate(`/en/movie/${id}/${name}/watch`)
  }

  if (loading) {
    return (
      <div className="w-content">
        <div className="content">
          <div className="content-parent">
            <div className="content-hero">
              <div className="content-info">
                <div className="content-poster"></div>
                <div className="content-plot">
                  <p className="load-heading"></p>
                  <p className="load-para w-30"></p>
                  <p className="load-para w-60"></p>

                  <p className="content-overview">
                    <p className="load-para w-60"></p>
                    <p className="load-para w-30"></p>
                    <p className="load-para w-60"></p>
                    <p className="load-para w-30"></p>
                    <p className="load-para w-60"></p>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-content">
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
                <h2 className="content-title">{data.title}</h2>
                <p className="content-tagline">{data.tagline}</p>
                <p className="content-details">
                  <i className="bi bi-calendar-day"></i>{" "}
                  {getMonth(data.release_date)}{" "}
                  {data?.release_date?.slice(8, 10)},{" "}
                  {getYear(data.release_date)}
                  <span className="dot">.</span>
                  <span>
                    <i className="bi bi-star-fill"></i> {data.vote_average}
                  </span>
                  <span className="dot">.</span>
                  <span className="runtime">
                    <i className="bi bi-clock"></i>
                    {(data.runtime > 60 ? getHour(data.runtime) + "hr " : "") +
                      (getMinute(data.runtime)
                        ? getMinute(data.runtime) + " min"
                        : "")}
                  </span>
                </p>
                <div className="genres">
                  {data?.genres?.map((item, i) => (
                    <span className="genre">{item.name}</span>
                  ))}
                </div>
                <p className="content-overview">{data.overview}</p>
                <div className="show">
                    <div className="watch-now" onClick={watchNow}>
                      <i class="bi bi-play-fill"></i>
                      Watch Now
                    </div>
                  <div className="show-trailer" onClick={() => setwatch(true)}>
                    Trailer
                  </div>
                  
                </div>
              </div>
              <div className="content-o-details">
                <table>
                  <tr>
                    <td>Original Title</td>
                    <td>{data.original_title}</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>{data.status}</td>
                  </tr>
                  <tr>
                    <td>Language</td>
                    <td>
                      {" "}
                      {data.spoken_languages.map((item, i) => (
                        <span>
                          {item.english_name}
                          {i != data.spoken_languages.length - 1
                            ? ","
                            : ""}{" "}
                        </span>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td>Budget</td>
                    <td>{convertMoney(data.budget)}</td>
                  </tr>
                  <tr>
                    <td>Revenue</td>
                    <td>{convertMoney(data.revenue)}</td>
                  </tr>
                  <tr>
                    <td>Production</td>
                    <td>
                      {" "}
                      {data.production_companies.map((item, i) => (
                        <span>
                          {item.name}
                          {i != data.production_companies.length - 1
                            ? ","
                            : ""}{" "}
                        </span>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td>Available in</td>
                    <td>
                      {Object.keys(torrents).length?(torrents?.results?.length?null:<span>Not available</span>):<span>Getting torrent files</span>}
                      {
                        torrents?.results?.map((item)=>{
                          let hash=item.link.split('/')[5]
                          let name=String(item.title).split(' ')
                          return <a title={item.title} className="magnet-file" href={"magnet:?xt=urn:btih:"+hash+"&amp;dn="+item.title+"&amp;tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&amp;tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&amp;tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&amp;tr=udp%3A%2F%2Fp4p.arenabg.ch%3A1337&amp;tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337"}><img src={"/assets/magnet.svg"} alt={item.title} ></img> <span>{name[name.length-1]}</span></a>
                        })
                      }
                      <br />
                      {
                        torrents?.results?.map((item)=>{
                          let hash=item.link.split('/')[5]
                          let name=String(item.title).split(' ')
                          return <a title={item.title} className="torrent-file" href={"https://torrents.yts.hn/torrent/download/"+hash}><i class="bi bi-download"></i> <span>{name[name.length-1]}</span></a>
                        })
                      }
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
     
          <div className="content-c" >
            <div className="c-header">
              <div className="h-line" />
              <h2>Cast</h2>
              <div className="h-line" />
            </div>
            <ScrollContainer className="c-container">
              {data.credits.cast.map((item) => (
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
          <div className="content-c">
            <div className="c-header">
              <div className="h-line" />
              <h2>Crew</h2>
              <div className="h-line" />
            </div>
            <ScrollContainer className="c-container">
              {data.credits.crew.map((item) => (
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
          <div className="recommendation-container">
          <div className="c-header">
              <div className="h-line" />
              <h2>More like this</h2>
              <div className="h-line" />
            </div>
              <div className="r-poster-container">
                {
                  data.recommendations.results.map((item)=>(
                    <Poster type="movie" key={item.id} item={item}  />
                  ))
                }
              </div>
          </div>
          <div className="recommendation-container">
          <div className="c-header">
              <div className="h-line" />
              <h2>Recommendations</h2>
              <div className="h-line" />
            </div>
              <div className="r-poster-container">
                {
                  data.similar.results.map((item)=>(
                    <Poster type="movie" key={item.id} item={item}  />
                  ))
                }
              </div>
          </div>
        </div>
      </div>
      {/* {torrents?.results?.map((item)=>{
        let hash=item.link.split('/')[5]
        return (<div>
            <a href={"https://torrents.yts.hn/torrent/download/"+hash} title={item.title}>{item.title} </a>
            <a href={"magnet:?xt=urn:btih:"+hash+"&amp;dn="+item.title+"&amp;tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&amp;tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&amp;tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&amp;tr=udp%3A%2F%2Fp4p.arenabg.ch%3A1337&amp;tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337"} title={item.title}>{item.title} magnet link</a>
          </div>
      )}
      )} */}
    </div>
  );
}

export default Movie;
