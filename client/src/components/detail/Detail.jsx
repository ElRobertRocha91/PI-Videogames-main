import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../redux/actions";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./Detail.module.css"
import Loading  from "../loading/Loading";

export default function Detail(){
    //console.log(props);
    const [loading, setLoading] = useState(true);
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

    //Usamos el método estatico Object.keys(), para saber si el array devuelto tiene las propiedades  que va a ser renderizadas 
    if(Object.keys(myVideogame).length > 0 && loading){
        setLoading(false)
    }
    return(
        <div>
            {Object.keys(myVideogame).length > 0 && !loading ?
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
                </div> : <Loading/>
            }

        </div> : <Loading/>
                
        }
        </div>
    )
}