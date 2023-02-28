import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllVideogames, orderByName, orderByRating, filterCreated, getGenres, filterGenres } from "../../redux/actions";
import Card from "../card/Card";
import Paginado from "../paginado/Paginado";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";

//useSelector = Hooks que funciona igual que el mapStateToProps;
//useDispatch = Hooks que funciona igual que el mapdispatchToProps;
//useEffect = Hooks que emula los ciclos de vida del componente(montaje, desmontaje y actualización);

export default function Home () {
    const dispatch = useDispatch();

    const allVideoGames = useSelector((state) => state.allVideoGames);//state es el Est. Global que es un Obj y nos traemos solo la propiedad que vamos a utilizar.
    // const { allVideoGames } = useSelector(state => state);

    //Guardo los generos que voy a utilizar del estado global 
    const allGenres = useSelector((state) => state.genres);
    
    //Estado local para el ordenamiento
    const [order, setOrder] = useState("");

    //Paginado:
    //Defino varios estados locales
    const [pageCurrent, setPageCurrent] = useState(1)

    //Luego un estado de cuantos videogames quiero tener por pagina
    const [gamesPerPage, setGamesPerPage] = useState(15)

    //Declaro una const del ultimo videogames
    const indexOfLastGames = pageCurrent * gamesPerPage // =>>

    //Declaro otra que va ser el indice del primer videogame
    //que va a ser igual al indice del ultimo videogames menos los videogames por pagina
    const indexOfFirstGames = indexOfLastGames - gamesPerPage

    //Creamos una nueva const que tendra los videogames de la pagina actual
    const gamesCurrent = allVideoGames.slice(indexOfFirstGames, indexOfLastGames)

    //Declaro un const paginado, que va a recibir como argumento un número de la pagina,
    //y vamos a setear la pagina en ese numero de paginas
    const paginado = (numberPage) => {
        setPageCurrent(numberPage)
    }

    //UseEffect = Recibe dos argumentos un callbacks y un array de dependencia
    useEffect( () => {
        dispatch(getAllVideogames());
        dispatch(getGenres());
    },[dispatch])
    //console.log(allVideoGames);

    //HandleClick nos reseteara de vuelta todo el estado de getAllVideoGames()
     function handleClick(e){
        //console.log(e)
        e.preventDefault();
        dispatch(getAllVideogames());
     }

     //HandleSort despachara la action que nos llegue por e.target.value
     function handleSort(e){
        //console.log(e.target.value);//==>>A-Z o Z-A
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setPageCurrent(1);
        setOrder(`Ordenado ${e.target.value}`);
     }

     //Despacho el ordemaniemto por rating
     function handleRatingSort(e){
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setPageCurrent(1);
        setOrder(`Ordenado ${e.target.value}`);
     }

     //Realizado el filtrado en el reducer, los despachamos
     function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value));
     }

     //Despacho los generos obtenidos
     function handleGenres(e){
        //El e.preventDefault(), no lo vamos a necesitar en esta funcion
        dispatch(filterGenres(e.target.value));
        setOrder(`${e.target.value}`);
     }

    return(
        <div>
            <Link to='/createVideogames'>Create videogames</Link>
            <h1>Online Games</h1>
            <button onClick={e => {handleClick(e)}}>
                Volver a cargar todos los videogames
            </button>
            <SearchBar/>
            <div>
                <select onChange={e => handleSort(e)}>
                    <option value="Order-Alphabetical">Order from the...</option>
                    <option value="A-Z"> A-Z </option>
                    <option value="Z-A"> Z-A </option>
                </select>
                <select onChange={e => handleRatingSort(e)}>
                    <option value="Order-Rating">Order by rating</option>
                    <option value="Men-May">Men-May</option>
                    <option value="May-Men">May-Men</option>
                </select>
                <select onChange={e => handleGenres(e)}>
                    <option value="All">Genres</option>
                    {
                        allGenres?.map(el => (<option key={el.id} value={el.name}>{el.name}</option>))
                    }
                </select>
                <select onChange={e => handleFilterCreated(e)}>
                    <option value="All">All</option>
                    <option value="Created">Created in DB</option>
                    <option value="Existing">From the API</option>
                </select>
            <Paginado
            gamesPerPage={gamesPerPage}
            allVideoGames={allVideoGames.length}
            paginado={paginado}
            />
            {
                gamesCurrent?.map(videogame => {
                    return (
                        <li key={videogame.id}>
                          <Link to={`/detail/${videogame.id}`}>
                            <Card
                            image={videogame.image}
                            name={videogame.name}
                            rating={videogame.rating}
                            genres={videogame.genres}
                            />
                          </Link>
                        </li>
                    )
                })
            }
            </div>
        </div>
    )
}
