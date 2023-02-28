import React from "react";
import style from "./Paginado.module.css";

export default function Paginado ({gamesPerPage, allVideoGames, paginado}) {
    //Me creo un const que será un array vacio
    const numberPage = []

    for(let i = 0; i <= Math.ceil(allVideoGames/gamesPerPage); i++){
        //Match.ceil ==>> Devuelve el entero mayor o igual más próximo a un número dado
        // i <= Math.ceil(100/15); ==> i <= Match.ceil(6,67) ==> i <= 7
        numberPage.push(i + 1)
    }

    return(
        <nav>
            <ul className={style.paginado}>
                {numberPage &&
                numberPage.map(number => {
                    return(  
                    <li key={number}>
                        <button onClick={() => paginado(number)}>{number}</button>
                    </li>
                )})}
            </ul>
        </nav>
    )
}