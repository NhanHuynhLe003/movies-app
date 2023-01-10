import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import style from "./homepage.module.css";
import MovieCard from "./MovieCard";
import MovieIcon from "../assets/svg/MovieIcon";
import MovieDetail from "./MovieDetail";
export default function Homepage() {
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setInformations(data.results);
      });
  }, []);

  //https://image.tmdb.org/t/p/w500

  const [informations, setInformations] = useState();


  return (
    <div id={style.homepageContainer}>
      <header>
        <Navbar />
      </header>
      <section id="content" className={style.content}>
        {informations &&
          informations.map((info, index) => {
            return (
              <MovieCard
                title={info.title}
                vote={info.vote_average}
                posters={info.backdrop_path}
                id={info.id}
              />
            );
          })}
      </section>
    </div>
  );
}
