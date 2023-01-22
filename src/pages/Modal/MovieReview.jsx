import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import MovieIcon from "../../assets/svg/MovieIcon";
import { AppContext } from "../../Context/AppContext";
import style from "../movieDetail.module.css";
import css from './movieReview.module.css'
export default function MovieReview({movieKey}) {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  
    //https://api.themoviedb.org/3/movie/315162/videos?api_key=2edf9f02e088272f6ff2eab6bf5fa21a&language=en-US
  return (
    <>
      <Button variant="primary" onClick={handleShow} className={style.watchBtn}>
        <MovieIcon />
        <span>Play Trailer</span>
      </Button>

      <Modal show={show} onHide={handleClose} size='xl'>
        <Modal.Header closeButton style={{border:'none'}} >
          <Modal.Title >Trailer</Modal.Title>
        </Modal.Header>
        <Modal.Body className={css.modalBody}>
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${movieKey}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className={css.videoHeight}
          ></iframe>
        </Modal.Body>
        <Modal.Footer style={{border: 'none'}} className={css.modalFooter}>
          <Button
            variant="success"
            onClick={handleClose}
            style={{ boxShadow: "3px 3px #ccc" }}
            
          >
            <span style={{ fontWeight: "bold" }}>Close</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
