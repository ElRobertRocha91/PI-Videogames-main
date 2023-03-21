import { GET_ALL_VIDEOGAMES, GET_VIDEOGAME_BY_NAME, GET_DETAILS, ORDER_BY_NAME, ORDER_BY_RATING, FILTER_CREATED, FILTER_GENRES, GET_GENRES, GET_PLATFORMS, FILTER_PLATFORMS } from "./action-types";
import axios from "axios";

//Obtenemos los videogames 
export function getAllVideogames() {
    // Siempre que solicitemos info a un server, ya sea que usemos feth o axios.
    //La acción retorna otra función e interviene nuestro Midlleware
    return async function (dispatch){
        //-----Axios----
        var json = await axios.get("http://localhost:3001/videogames")
        return dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: json.data
        })
        //----Fetch-----
        // fetch("http://localhost:3001/videogames");
        // .then(response => response.json())
        // .then(data => {
        //     return dispatch({type: GET_ALL_VIDEOGAMES, payload: data})
        // })
    }
}

//Creo una función que pondremos en el input, para obtener el videogame por nombre
export function getVideogameByName(name){
    return async function(dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/videogames?name=${name}`);
            return dispatch({
                type: GET_VIDEOGAME_BY_NAME,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

//ACTIONS ==>> funcions que pondremos sobre cada card para obetner el detallado de cada uno de los videogames por ID
export function getDetails(id){
    return async function(dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/videogames/${id}`);
            return dispatch({
                type: GET_DETAILS,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

//Función para ordenar alfabeticamente
export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

//Funcion para ordenar por puntaje de rating
export function orderByRating(payload){
    return{
        type: ORDER_BY_RATING,
        payload
    }
}

//FILTRADO por creado en DB o proveniente de la API
export function filterCreated(payload){
    return{
        type: FILTER_CREATED,
        payload
    }
}

//Para el filtro por GENEROS, vamos a necesitar obtenerlos en primer lugar
export function getGenres(){
    return async function(dispatch){
        try {
            var json = await axios.get("http://localhost:3001/genres");
            //console.log(json.data);
            return dispatch({
                type: GET_GENRES,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterGenres(payload){
    return{
        type: FILTER_GENRES,
        payload
    }
}

//Defino mis actions para traerme las plataformas que se usaran para el formulario
export function getPlatforms(){
    return async function(dispatch){
        try {
            var json = await axios.get("http://localhost:3001/platforms")
            return dispatch({
                type: GET_PLATFORMS,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterPlatforms(payload){
    return{
        type: FILTER_PLATFORMS,
        payload
    }
}

//Definimos la action para crear el videogames
export function postVideogames(payload){
    //console.log(payload)
    return async function(){
        try {
            const response = await axios.post("http://localhost:3001/videogames", payload);
            console.log(response);
            return response
        } catch (error) {
            console.log(error)
        }
    }
}