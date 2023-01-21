import React, { useContext } from "react";
import Navbar from "./Navbar";
import style from "./homepage.module.css";
import MovieCard from "./MovieCard";
import { AppContext } from "../Context/AppContext";
import Pagination from "./Pagination";


export default function Homepage() {
  const {informations} = useContext(AppContext);
  
  return (
    <div id={style.homepageContainer}>
      <header>
        <Navbar navSelected={'homepage'}/>
      </header>
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
      <div style={{display:'flex', flexDirection:'row', justifyContent:'center', padding:'2rem 0'}}>
        <Pagination totalPage={500}/>
      </div>
      
    </div>
  );
}
