import React, { useRef } from "react";
import style from "../styles/castInMovie.module.css";

//isue dg trong trang detail -> reset phai doi cho data truyen vao thi moi chay
export default function GetCastInMovie({ cast }) {
  const infoCharacterRef = useRef([]);

  // setIdMovie(curId)
  if (cast) {
    infoCharacterRef.current = cast.cast;
  }
  return (
    <div id={style.CastContainer}>
      {infoCharacterRef.current &&
        infoCharacterRef.current.length > 0 &&
        infoCharacterRef.current.map((char, index) => {
          return (
            <div className={style.card}>
              <div
                className={style.avatar}
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${char.profile_path})`,
                }}
              ></div>
              <h3 className={style.nameChar}>{char.name}</h3>
            </div>
          );
        })}
    </div>
  );
}
