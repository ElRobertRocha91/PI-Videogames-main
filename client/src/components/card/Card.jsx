import React from "react";
import style from "./Card.module.css";

//Recibimos Props como argumentos
export default function Card({id, name, genres, rating, image}) {
    return(
        <div>
          <div className={style.card}>
            <img src={image} alt={name} className={style.img}/>
            <h1>{name}</h1>
            <h3>Generos: {genres}</h3>
            <h3>Rating: {rating}</h3>
          </div>
        </div>
    )
}