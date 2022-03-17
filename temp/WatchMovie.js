import React,{useEffect,useRef,useState} from 'react'
import {useParams,useLocation, Link} from 'react-router-dom'
import axios from 'axios'

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
  

function WatchMovie(props) {
    let query=new URLSearchParams(useLocation().search);
    let {id,name}=useParams()
    const [data, setdata] = useState({});
    const [loading, setloading] = useState(true);

    useEffect(() => {
        async function getAllResults() {
            await getData();
          }
          getAllResults();
          return()=>{}
    }, [])
    
  function openFullscreen() {
    var elem = document.getElementById("watch-iframe");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  const getData = async () => {
    try {
      var response = await axios.get(
        `
          https://api.themoviedb.org/3/movie/${id}?api_key=dfc43a605d906f9da6982495ad7bb34e&language=en-US&append_to_response=videos,credits`
      );
      setdata(response.data);
      setloading(false);
      document.title =
        "Watch "+response.data.title + " (" + getYear(response.data.release_date) + ")";
      // loadingContext.done();
    } catch (error) {
      console.log("error");
    }
  };
  
    return(
        <div className='watch-section'>
            <iframe id="watch-iframe" frameBorder={0} webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" src={"https://www.2embed.ru/embed/"+(query.get("source") && query.get("source")==="1"?"imdb/movie?id=tt":"tmdb/movie?id=")+id} title={id}></iframe>
            {loading?
                null
            :
                <div className="w-details">
                    <Link to={"/en/movie/"+id+"/"+name}><h2>{data.title}</h2></Link>
                    <div>{getYear(data.release_date)} . {data.vote_average}/10 . {(data.runtime > 60 ? getHour(data.runtime) + "hr " : "") +
                      (getMinute(data.runtime)
                        ? getMinute(data.runtime) + " min"
                        : "")} </div>
                    <div className="genres">
                        {data?.genres?.map((item, i) => (
                            <span className="genre">{item.name}</span>
                        ))}
                    </div>
                    <p>{data.overview}</p>
                </div>
            }
        </div>
    )
}
export default WatchMovie