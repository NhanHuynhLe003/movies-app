import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MovieIcon from "../assets/svg/MovieIcon";
import { useEffect } from "react";
import style from './movieDetail.module.css'
import Navbar from "./Navbar";
export default function MovieDetail() {
  const param = useParams();
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        data.results.map((item, index) => {
          if (Number(param.id) === item.id) {
            console.log(123);
            setMyData(item);
          }
        });
      });
  }, []);

  const [myData, setMyData] = useState();
  return (
    <div className={style.main}>
      <Navbar/>
      {myData && (
        <section className={style.content}>
          <div className={style.infoContainer}>
            <div className={style.posterMovie} style={{backgroundImage:`url(https://image.tmdb.org/t/p/w500${myData.backdrop_path})`}}>
            </div>
            <div className={style.infoMovie}>
              <h1 className={`${style.padding1rem} ${style.titleH1}`} style={{color:'#fff'}}>{myData.title}</h1>
              <p className={style.padding1rem} style={{color:'#ccc'}}>{myData.overview}</p>
              <p className={style.padding1rem} style={{color:'#fff', fontWeight:'bold', paddingBottom:'3rem'}}>Release Date: {myData.release_date}</p>
              <button className={style.watchBtn}>
                <MovieIcon />
                <span>Play Trailer</span>
              </button>
            </div>
          </div>
          <div></div>
        </section>
      )}
    </div>
  );
}
