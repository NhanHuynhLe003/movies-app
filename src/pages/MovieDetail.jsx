import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";
import { AppContext } from "../Context/AppContext";
import GetCastInMovie from "../components/GetCastInMovie";
import MovieReview from "../components/Modal/MovieReview";
import MainLayout from "../layouts/MainLayout";
import style from "../styles/movieDetail.module.css";

export default function MovieDetail() {
  //https://api.themoviedb.org/3/movie/315162?api_key=2edf9f02e088272f6ff2eab6bf5fa21a&language=en-US

  // lay ra nhung api user chi tiết
  const [movieDetail, setMovieDetail] = useState({});
  const [movieVideo, setMovieVideo] = useState({});
  const [idMovie, setIdMovie] = useState(0);
  const [cast, setCast] = useState();
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${idMovie}?api_key=2edf9f02e088272f6ff2eab6bf5fa21a&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieDetail(data);
        setCast(data);
      });

    fetch(
      `https://api.themoviedb.org/3/movie/${idMovie}/credits?api_key=2edf9f02e088272f6ff2eab6bf5fa21a&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setCast(data);
      });

    fetch(
      `https://api.themoviedb.org/3/movie/${idMovie}/videos?api_key=2edf9f02e088272f6ff2eab6bf5fa21a&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieVideo(data.results);
      });
  }, [idMovie]);

  const param = useParams();
  const movieKeyRef = useRef("");

  if (idMovie === 0) {
    setIdMovie(param.id);
  }

  if (movieVideo && movieVideo.length > 0) {
    const movieKey = movieVideo[movieVideo.length - 1].key;
    movieKeyRef.current = movieKey;
  }

  const location = useLocation();
  const [loading, setLoading] = useState(false);

  return (
    movieDetail && (
      <MainLayout paramUrl={location.pathname}>
        <div className={style.main}>
          <section className={style.content}>
            <div className={style.infoContainer}>
              <div
                onClick={() => {}}
                className={style.posterMovie}
                style={
                  movieDetail.poster_path && {
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieDetail.poster_path})`,
                  }
                }
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
                <MovieReview movieKey={movieKeyRef.current} />
              </div>
            </div>
            <div>
              <h1
                style={{ color: "#fff", marginTop: "3rem", fontSize: "3rem" }}
              >
                Cast
              </h1>
              <GetCastInMovie cast={cast} />
            </div>
          </section>
        </div>
      </MainLayout>
    )
  );
}
