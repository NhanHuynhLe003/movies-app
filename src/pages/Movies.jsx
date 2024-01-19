import React, { useState } from "react";

import { useLocation } from "react-router-dom";
import GenreList from "../components/GenreList";
import Ipagination from "../components/Ipagination";
import MovieCard from "../components/MovieCard";
import MainLayout from "../layouts/MainLayout";
import css from "../styles/movies.module.css";

export default function Movies() {
  const location = useLocation();
  const [infoFromGenre, setInfoFromGenre] = useState([]);
  function getGenreInfo(data) {
    setInfoFromGenre(data);
  }
  return (
    <MainLayout paramUrl={location.pathname}>
      <div className={css.homepageContainer}>
        <section id="content" className={css.sectionContent}>
          <div id="genreList">
            <GenreList
              key={"genreList"}
              getGenreInfo={(prev) => getGenreInfo(prev)}
            />
          </div>
          <div
            id="cardContainer"
            className={css.content}
            style={{ minHeight: "45vh" }}
          >
            {infoFromGenre.length > 0 &&
              infoFromGenre.map((info, index) => {
                return (
                  <MovieCard
                    title={info.title}
                    vote={info.vote_average}
                    posters={info.poster_path}
                    id={info.id}
                  />
                );
              })}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              padding: "2rem 0",
            }}
          >
            <Ipagination totalPage={500}></Ipagination>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
