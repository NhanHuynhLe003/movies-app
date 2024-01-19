import React, { useContext, useEffect, useReducer } from "react";
import { AppContext } from "../Context/AppContext";
import { initState } from "../reducer/constants";
import reducer from "../reducer/reducer";
import css from "../styles/genreList.module.css";
import GenreCard from "./GenreCard";
export default function GenreList({ getGenreInfo, getInfo }) {
  //để các hàm bên ngoài chứ ko để trong genre card để tránh re-render khi unmount
  const { genres, setGenreId } = useContext(AppContext);
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    //biến lưu trữ genreId đã được nhấn(val = true) để dùng api search
    const genreIdsString = Object.keys(state.genreList)
      .filter((genre) => state.genreList[genre])
      .join(",");

    setGenreId(genreIdsString);
  }, [state]);

  return (
    <div className={css.genreListItem}>
      {genres.map((genre, index) => {
        const idGenreCard = genre.id;
        const boo = state.genreList[idGenreCard];

        return (
          <GenreCard
            isActive={Boolean(boo)}
            state={state}
            dispatch={dispatch}
            indexCard={index}
            idGenre={genre.id}
            genreName={genre.name}
          />
        );
      })}
    </div>
  );
}
