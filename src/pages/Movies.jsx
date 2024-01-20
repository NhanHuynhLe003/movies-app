import React, { useContext, useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import GenreList from "../components/GenreList";
import Ipagination from "../components/Ipagination";
import MovieCard from "../components/MovieCard";
import SkeletonMovieCard from "../components/skeleton/skeletonMovieCard";
import MainLayout from "../layouts/MainLayout";
import css from "../styles/movies.module.css";

export default function Movies() {
  const { moviesGenre, maxTotal } = useContext(AppContext);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
    new Promise(() => setTimeout(() => setLoading(true), 300));
  }, [moviesGenre]);
  return (
    <MainLayout paramUrl={location.pathname}>
      <div className={css.homepageContainer}>
        <section id="content" className={css.sectionContent}>
          <div id="genreList">
            <GenreList key={"genreListMovie"} />
          </div>
          <div
            id="cardContainer"
            className={css.content}
            style={{ minHeight: "45vh" }}
          >
            {moviesGenre && moviesGenre.length > 0 ? (
              loading ? (
                moviesGenre.map((info, index) => {
                  return (
                    <MovieCard
                      title={info.title}
                      vote={info.vote_average}
                      posters={info.poster_path}
                      id={info.id}
                    />
                  );
                })
              ) : (
                [...Array(20)].map((index) => (
                  <SkeletonMovieCard></SkeletonMovieCard>
                ))
              )
            ) : (
              <h2 style={{ marginTop: "5rem" }}>Movie Not Found</h2>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              padding: "2rem 0",
            }}
          >
            <Ipagination
              pageName={"movies"}
              totalPage={maxTotal.movies}
            ></Ipagination>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
