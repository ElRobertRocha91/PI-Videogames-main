import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer";//Realizado este primer paso vamos a darle funcionalidad a nuestra reducer
import thunkMiddleware from "redux-thunk";


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//Esta linea nos permite conectar con la extension del navegador >>> REDUX DEVTOOLS

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))
);
//Nuestra store nos va permitir hacer peticiones al server, funcionando como un interlocutor entre las peticiones del cliente al servidor

export default store;