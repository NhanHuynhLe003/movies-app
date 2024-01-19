import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import IPagination from "../components/Ipagination";
import MovieCard from "../components/MovieCard";
import MainLayout from "../layouts/MainLayout";
import style from "../styles/homepage.module.css";
import { useLocation } from "react-router-dom";
import SkeletonMovieCard from "../components/skeleton/skeletonMovieCard";
export default function Homepage() {
  const { informations, maxTotalPageTrending } = useContext(AppContext);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    new Promise(() => setTimeout(() => setLoading(true), 600));
  }, []);
  return (
    <MainLayout paramUrl={location.pathname}>
      <div id={style.homepageContainer}>
        <section id="content" className={style.content}>
          {informations && informations.length > 0 ? (
            loading ? (
              informations.map((info, index) => {
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
              [...Array(20)].map((_) => <SkeletonMovieCard></SkeletonMovieCard>)
            )
          ) : (
            <h2>Movie Not Found</h2>
          )}
        </section>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: "2rem 0",
          }}
        >
          <IPagination totalPage={maxTotalPageTrending} />
        </div>
      </div>
    </MainLayout>
  );
}
