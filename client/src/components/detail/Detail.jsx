import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../redux/actions";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./Detail.module.css"

export default function Detail(){
    //console.log(props);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetails(id));
    },[dispatch, id])

    const myVideogame = useSelector((state) => state.detail)
    console.log(myVideogame);//==>>Es un objeto, "NO UN ARREGLO"

    //Trabajo por separado estas dos propiedades del obj myVideogame para renderizarlas correctamente en el detail
    const detailPlatform = myVideogame.platforms?.join('-');
    const detailGenres = myVideogame.genres?.join('-');
    console.log(myVideogame.platforms);//LLega como un array vacio buscar el error 
    return(
        <div>
        <div className={style.container}>
            <div>
                <Link to="/home">
                   <button className={style.button}>Return Home</button>
                </Link>
            </div>
            {
                myVideogame?
                <div>
                    <div className={style.detail}>
                        <div className={style.img}>
                            <h2>{myVideogame.name}</h2>
                            <img src={myVideogame.image} alt="img not found" height="250px" width="250px"/>
                            <div>
                                <label>Plataformas: </label>
                                <p>{detailPlatform? detailPlatform:"No tiene plataformas"}</p>
                                <label>Generos: </label>
                                <p>{detailGenres}</p>
                                <label>Lanzamiento</label>
                                <p>{myVideogame.released}</p>
                                <label>Rating: </label>
                                <p>{myVideogame.rating}</p>
                            </div>
                        </div>
                    <div className={style.description}>
                        <p>{myVideogame.description}</p>
                    </div>
                    </div>
                </div> : <p>Loading...</p>
            }

        </div>
        </div>
    )
}