import React from "react";
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Poster({ item, type }) {
  const getYear = (date) => {
    return date?.slice(0, 4);
  };
  const removeSpecialCharacters=(title)=>{
    return title.replace(/[&#,+()$~%'.":!*?<>{}]/g, '')
  }

  const covertToLinkWords=(title)=>{
    var s=removeSpecialCharacters(title)
    return s.replace(/\s+/g, '-').toLowerCase()
  }

  const getLink=()=>{
    if(type==="movie"){
      return "/en/movie/" + item.id + "/" + covertToLinkWords(type==="movie"?item.title:item.name) + "-" + getYear(item.release_date)
    }
    else return "/en/tv/" + item.id + "/" + covertToLinkWords(type==="movie"?item.title:item.name) + "-" + getYear(item.first_air_date)
  }
  
  return (
    <div className="poster">
      <Link to={getLink()}>
        <LazyLoadImage
          alt={item.title}
          src={"https://image.tmdb.org/t/p/original" + item.poster_path}
          className="poster-image"
          loading="lazy"
          effect="blur"
        />
      </Link>

      {/* <div className="poster-detail">
        <Link to={getLink()}>
          <p className="poster-title">
            {type === "movie" ? item.title : item.name}
          </p>
        </Link>
        <p className="poster-year">
          {type === "movie"
            ? getYear(item.release_date)
            : getYear(item.first_air_date)}
        </p>
      </div> */}
    </div>
  );
}

