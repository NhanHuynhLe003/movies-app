import React from "react";
import { Skeleton } from "antd";
import style from "../../styles/movieDetail.module.css";
export default function SkeletonMovieDetail() {
  return (
    <div className={style.infoContainer}>
      {/* Skeleton cho poster của phim */}
      <Skeleton.Image className={style.posterMovie} />

      <div className={style.infoMovie}>
        {/* Skeleton cho tiêu đề phim */}
        <Skeleton.Input style={{ width: 200, marginBottom: "1rem" }} active />

        {/* Skeleton cho mô tả phim */}
        <Skeleton paragraph={{ rows: 3 }} active />

        {/* Skeleton cho ngày phát hành */}
        <Skeleton.Input style={{ width: 100 }} active />
      </div>
    </div>
  );
}
