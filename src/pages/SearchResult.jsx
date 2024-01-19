import React, { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import Ipagination from "../components/Ipagination";
import MovieCard from "../components/MovieCard";
import MainLayout from "../layouts/MainLayout";
import style from "../styles/searchResult.module.css";
import { useLocation } from "react-router-dom";
export default function SearchResult() {
  //https://api.themoviedb.org/3/search/movie?api_key=2edf9f02e088272f6ff2eab6bf5fa21a&language=en-US&query=spider&page=1
  const { searchResultStorage, totalPageSearchResult } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    console.log(totalPageSearchResult);
  }, [totalPageSearchResult]);
  return (
    <MainLayout paramUrl={location.pathname}>
      <div id="searchResult" className={style.searchResult}>
        <section id="content" className={style.contentSection}>
          <div id="movieSearched" className={style.movieSearched}>
            {searchResultStorage.length > 0 ? (
              searchResultStorage.map((movie, index) => {
                return (
                  <MovieCard
                    key={`${movie}-${index}`}
                    title={movie.title}
                    vote={movie.vote_average}
                    posters={movie.poster_path}
                    id={movie.id}
                  />
                );
              })
            ) : (
              <h1 className={style.movieNotFound}>Movie Not Found</h1>
            )}
          </div>
          <Ipagination totalPage={500}></Ipagination>
        </section>
        <footer></footer>
      </div>
    </MainLayout>
  );
}
