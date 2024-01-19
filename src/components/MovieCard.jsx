import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import css from "../styles/MovieCard.module.css";

export default function MovieCard({ title, vote, posters, id }) {
  const { setIdMovie } = useContext(AppContext);

  return (
    <Link
      onClick={() => {
        setIdMovie(id);
      }}
      style={{ textDecoration: "none" }}
      to={`/${id}`}
      className={css.cardContainer}
    >
      <div className="thumbnail-container">
        <div
          className={css.backgroundThumbnail}
          style={{
            background: `url(https://image.tmdb.org/t/p/w500${posters})`,
          }}
          alt="poster"
        />
      </div>
      <p className={css.voteAverage}>{vote} ★</p>
      <p className={css.title}>{title}</p>
    </Link>
  );
}
