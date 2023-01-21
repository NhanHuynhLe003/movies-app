import React, { useState } from 'react'

import MovieCard from './MovieCard';
import Navbar from './Navbar'
import css from './movies.module.css'
import GenreList from './GenreList';
import Pagination from './Pagination';


export default function Movies() {
    const [infoFromGenre, setInfoFromGenre] = useState([]);
    function getGenreInfo(data){
      setInfoFromGenre(data);
    }
  return (
    <div className={css.homepageContainer}>
      <header><Navbar navSelected={'movies'}/></header>
      <section id="content" className={css.sectionContent}>
      <div id="genreList">
        <GenreList key={'genreList'} getGenreInfo = {prev => getGenreInfo(prev)}/>
      </div>
      <div id="cardContainer" className={css.content} style={{minHeight:'45vh'}}>
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
      <div style={{display:'flex', flexDirection:'row', justifyContent:'center', padding:'2rem 0'}}>
        <Pagination totalPage={500}/>
      </div>
      </section>
      
    </div>
  )
}
