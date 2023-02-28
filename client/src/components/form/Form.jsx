import React from "react";
import { useState, useEffect } from "react";
import validation from "./Validation";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getPlatforms, postVideogames } from "../../redux/actions";
import { Link, useHistory } from "react-router-dom"


export default function Form(){
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    const platForms = useSelector((state) => state.platforms);
    const history = useHistory();

    //Me guardo el formulario en un estado, que tendra mi objeto con todas las propiedades del videogames a crear
    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        image: "",
        platforms: [],
        genres: []
    })

    //Creo un estado local para encontrar errores en el formulario
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
    }, [dispatch])

    //Logica de mi formulario
    //Creo una funcion que recibira los cambios que haya en el input y modifique nuestro estado local
    function handleInputChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        //console.log(input)
        //Seteo los errores al mismo tiempo que suceden los cambios en el input
        setErrors(validation({
            ...errors,
            [e.target.name]: e.target.value
        }))
    } 

    function handleSelectPlatforms(e){
        //Verifico que no se repitan
        if(!input.platforms.includes(e.target.value)){
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
            setErrors(validation({
                ...input,
                platforms: [...input.platforms, e.target.value]
            }))
        }else{
            setInput({
                ...input
            })
        }
    }

    function handleDeletePlatforms(e){
        setInput({
            ...input,
            platforms: input.platforms.filter(el => el !== e)
        })
    }

    function handleSelectGenres(e){
        //Verifico que no puedam seleccionarse repetidos
        if(!input.genres.includes(e.target.value)){
            //Si el genero seleccionado no esta en el array, entonces incluilo
            setInput({
                ...input,
                genres: [...input.genres, e.target.value] //==>>Traigo lo que ya tengo y lo concateno
            });
            setErrors(validation({
                ...input,
                genres:[...input.genres, e.target.value]
            }));
        }else{
            setInput({
                ...input
            });
        }
    }

    //Agregamos la posibilidad de eliminar los generos seleccionados
    function handleDeleteGenres(e){
        setInput({
            ...input,
            genres: input.genres.filter(el => el !== e)
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postVideogames(input))
        //Mandamos un msj de confirmacion
        alert("Videogame created with success");
        //Seteamos de nuevo el input, para limpiarlo
        setInput({
            name: "",
            description: "",
            released: "",
            rating: "",
            image: "",
            platforms: [],
            genres: []
        })
        //Finalizada la creación redirigo a mi pagina principal
        history.push('/home');
    }

    return(
        <div>
            <Link to='/home'>
                <button>Return Home</button>
            </Link>
            <h1>Create Videogames</h1>
            <form>
                <div>
                    <label>Name:</label>
                    <input
                    type="text" 
                    value={input.name} 
                    name="name" 
                    onChange={handleInputChange}
                    />
                    {/*Renderizamos en un condicional el errors*/}
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div>
                    <label>Description:</label>
                    <input
                    type="text" 
                    value={input.description} 
                    name="description" 
                    onChange={handleInputChange} 
                    />
                    {errors.description && <p>{errors.description}</p>}
                </div>
                <div>
                    <label>Released:</label>
                    <input 
                    type="date" 
                    value={input.released} 
                    name="released" 
                    onChange={handleInputChange}
                    />
                    {errors.released && <p>{errors.released}</p>}
                </div>
                <div>
                    <label>Rating:</label>
                    <input 
                    type="float" 
                    value={input.rating} 
                    name="rating" 
                    onChange={handleInputChange}
                    />
                    {errors.rating && <p>{errors.rating}</p>}
                </div>
                <div>
                    <label>Image:</label>
                    <input
                    type="text" 
                    value={input.image} 
                    name="image" 
                    onChange={handleInputChange}
                    />
                    {errors.image && <p>{errors.image}</p>}
                </div>
                <div>
                    {/* <label>Platforms:</label>
                    <input 
                    type="text" 
                    value={input.platforms} 
                    name="platforms" 
                    onChange={handleInputChange}
                    /> */}
                    <p>Platforms:</p>
                    <select onChange={(e) => handleSelectPlatforms(e)}>
                        <option value="All">All</option>
                        {platForms && 
                        platForms.map((platform) => {
                            return(
                                <option key={platform} value={platform}>{platform}</option>
                            )
                        })
                        }
                    </select>
                    {errors.platForms && <p>{errors.platForms}</p>}
                </div>
                <ul>
                    {input.platforms.map((el) => (
                        <li key={el}>
                            <div>
                                {el + " "}
                                <button type="button" onClick={() => handleDeletePlatforms(el)}>x</button>
                            </div>
                        </li>
                     ) ) } 
                </ul>
                <div>
                    <p>Genres:</p>
                    <select onChange={(e) => handleSelectGenres(e)}>
                        <option value="All">All</option>
                        {genres && 
                        genres.map((genre) =>{
                            return(
                            <option  key={genre.id} value={genre.name}>{genre.name}</option>
                        )})
                        }
                    </select>
                </div>
                <ul>
                    {input.genres.map((el) => (
                        <li key={el}>
                            <div>
                               {el + " "} 
                               <button type="button" onClick={() => handleDeleteGenres(el)}>x</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div>
                    <button type="submit" onSubmit={(e) => handleSubmit(e)}>Create</button>
                </div>
            </form>
        </div>
    )
}