import React from "react";
import style from "./Card.module.css";

//Recibimos Props como argumentos
export default function Card({id, name, genres, rating, image}) {
    return(
        <div className={style.container}>
          <div className={style.card}>
            <img src={image} alt={name} className={style.img}/>
            <div className={style.text}>
              <h3>{name}</h3>
              <h6>Generos: {genres}</h6>
              <h6>Rating: {rating}</h6>
            </div>
          </div>
        </div>
    )
}