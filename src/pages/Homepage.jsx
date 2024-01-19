import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import IPagination from "../components/Ipagination";
import MovieCard from "../components/MovieCard";
import MainLayout from "../layouts/MainLayout";
import style from "../styles/homepage.module.css";
import { useLocation } from "react-router-dom";
export default function Homepage() {
  const { informations } = useContext(AppContext);
  const location = useLocation();

  return (
    <MainLayout paramUrl={location.pathname}>
      <div id={style.homepageContainer}>
        <section id="content" className={style.content}>
          {informations.length > 0 &&
            informations.map((info, index) => {
              return (
                <MovieCard
                  title={info.title}
                  vote={info.vote_average}
                  posters={info.poster_path}
                  id={info.id}
                />
              );
            })}
        </section>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: "2rem 0",
          }}
        >
          <IPagination totalPage={500} />
        </div>
      </div>
    </MainLayout>
  );
}
