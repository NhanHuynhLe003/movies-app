import React, { useContext } from "react";
import { Skeleton } from "antd";
import css from "../../styles/MovieCard.module.css";
import clsx from "clsx";
export default function SkeletonMovieCard() {
  return (
    <div className={clsx("card-movie-skeleton", css.cardContainer)}>
      <Skeleton.Image active></Skeleton.Image>
      <Skeleton
        title={false}
        active
        paragraph={{ rows: 2, width: ["3rem", "90%"] }}
      ></Skeleton>
    </div>
  );
}
