
import React, { useEffect, useState,useRef } from 'react'
import axios from 'axios';
import Poster from './molecules/Poster';
import ScrollContainer from 'react-indiana-drag-scroll'

function PosterLoader() {
  let p=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  return(
    <div className="p-load-container">
      {
        p.map((item)=>
          <div key={item} className='p-load'>

          </div>
        )
      }
    </div>
  )
}

function Home() {
  const [movieData, setmovieData] = useState([])
  const [movieDataLoading, setmovieDataLoading] = useState(true)
  const [tvData, settvData] = useState([])
  const [tvDataLoading, settvDataLoading] = useState(true)
  const [movieSlideValue, setmovieSlideValue] = useState(0)
  const [movieSlideValueMax, setmovieSlideValueMax] = useState(3380-780)
  const tvSlideRef = useRef(null)

  useEffect(() => {
    async function getAllResults() {
      await getMovieData();
      await getTvData()
      // await getYTSData()
    }
    getAllResults()
    return () => {

    }
  }, [])

  useEffect(() => {
    
    return () => {
      
    }
  }, [movieSlideValue])

 
  document.title = "Watch Movies & TV Shows - ZFlix"

  const getMovieData = async () => {
    try {
      var response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=dfc43a605d906f9da6982495ad7bb34e`
      );
      setmovieData(response.data.results);
      setmovieDataLoading(false)
    } catch (error) {
      console.log("error");
    }
  };

  const getTvData = async () => {
    try {
      var response = await axios.get(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=dfc43a605d906f9da6982495ad7bb34e`
      );
      settvData(response.data.results);
      settvDataLoading(false)
    } catch (error) {
      console.log("error");
    }
  };

  const getYTSData = async () => {
    try {
      var response = await axios.get(
        `https://yts.mx/api/v2/movie_details.json?movie_id=10`
      );
      console.log(response.data);
      // setmovieData(response.data);
    } catch (error) {
      console.log("error");
    }
  };

  const slideRight=(type)=>{
    if(type===1){
      console.log(movieSlideValue);
      if(movieSlideValue+200 >= (document.querySelector('.poster-container.movie').scrollWidth-document.querySelector('.poster-container.movie').clientWidth)){
        setmovieSlideValue((document.querySelector('.poster-container.movie').scrollWidth-document.querySelector('.poster-container.movie').clientWidth))
      }
      else{
        setmovieSlideValue(prev=>prev+676)
      }
    }
  }
  const slideLeft=(type)=>{
    if(type===1){
      if(movieSlideValue-200 <=0 ){
        setmovieSlideValue(0)
      }
      else{
        setmovieSlideValue(prev=>prev-676)
      }
    }
  }

  return (
    <div className="main-content" >
      <section className="section-main">
        <div className="section-header">
          <h2 className="heading">Trending Movies</h2>
          <p>Here are some of the most recent movies recommended by our community</p>
        </div>
        {movieDataLoading?
        <PosterLoader  />
          :
            <div className="whole-poster">
              {/* {movieSlideValue?
                <div className="left-arrow arrow" onClick={()=>slideLeft(1)}> <i className="fas fa-chevron-left"></i> </div>
                :null}
              {movieSlideValue!==movieSlideValueMax?
                <div className="right-arrow arrow" onClick={()=>slideRight(1)}><i className="fas fa-chevron-right"></i>  </div>
                :null
                } */}
              <div className="poster-container movie">
                {movieData.map((item) => (
                  <Poster type="movie" key={item.id} item={item} />
                ))}
              </div>
            </div>
        }
        
      </section>
      <section className="section-main">
        <div className="section-header">
          <h2 className="heading">Trending TV Shows</h2>
          <p>Check out what everyone is talking about</p>
        </div>
        {tvDataLoading?
          <PosterLoader  />
          :
          <div className="whole-poster">
            <div ref={tvSlideRef} className="poster-container">
              {tvData.map((item) => (
                <Poster type="tv" key={item.id} item={item} />
              ))}
            </div>
          </div>
        }
      </section>
    </div>
  )
}

export default Home