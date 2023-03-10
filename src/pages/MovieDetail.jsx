import React, { useContext, useRef } from "react";
import { useParams } from "react-router-dom";

import style from "./movieDetail.module.css";
import Navbar from "./Navbar";
import { FaPlayCircle } from "react-icons/fa";
import { AppContext } from "../Context/AppContext";
import GetCastInMovie from "./GetCastInMovie";
import MovieReview from './Modal/MovieReview';


export default function MovieDetail() {
  
  //https://api.themoviedb.org/3/movie/315162?api_key=2edf9f02e088272f6ff2eab6bf5fa21a&language=en-US
  
  const {movieDetail, idMovie, setIdMovie, movieVideo} = useContext(AppContext)
  
  const param = useParams();
  const movieKeyRef = useRef('');
    
    if(idMovie === 0){
      setIdMovie(param.id);
    }
    
    if(movieVideo && movieVideo.length > 0){
      const movieKey = movieVideo[movieVideo.length-1].key;
      movieKeyRef.current = movieKey;
    }

  return (
    movieDetail !== undefined && (<div className={style.main}>
      <Navbar />
      
        <section className={style.content}>
          <div className={style.infoContainer}>
            <div
            onClick={() => {
              
              
            }}
              className={style.posterMovie}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieDetail.poster_path})`,
              }}
            >
              <FaPlayCircle className={style.playBtn} />
            </div>
            <div className={style.infoMovie}>
              <h1
                className={`${style.padding1rem} ${style.titleH1}`}
                style={{ color: "#fff" }}
              >
                {movieDetail.title}
              </h1>
              <p className={style.padding1rem} style={{ color: "#ccc" }}>
                {movieDetail.overview}
              </p>
              <p
                className={style.padding1rem}
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  paddingBottom: "3rem",
                }}
              >
                Release Date: {movieDetail.release_date}
              </p>
              <MovieReview movieKey={movieKeyRef.current}/>
            </div>
          </div>
          <div>
            <h1 style={{color: '#fff', marginTop: '3rem', fontSize:'3rem'}}>Cast</h1>
            <GetCastInMovie id={param.id}/>
          </div>
        </section>
        
    </div>
    )
  );
}
