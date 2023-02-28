import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../redux/actions";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

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
    const detailPlatform = myVideogame.platforms?.join(' ');
    const detailGenres = myVideogame.genres?.join(' ');
    console.log(myVideogame.platforms);//LLega como un array vacio buscar el error 
    return(
        <div>
            {
                myVideogame?
                <div>
                    <h1>{myVideogame.name}</h1>
                    <img src={myVideogame.image} alt="img not found" height="250px" width="250px"/>
                    <h5>Plataformas: {detailPlatform? detailPlatform:"No tiene plataformas"}</h5>
                    <h5>Generos: {detailGenres}</h5>
                    <p>Lanzamiento: {myVideogame.released}</p>
                    <p>Rating: {myVideogame.rating}</p>
                    <p>{myVideogame.description}</p>
                </div> : <p>Loading...</p>
            }
            <Link to="/home">
                <button>Return Home</button>
            </Link>
        </div>
    )
}