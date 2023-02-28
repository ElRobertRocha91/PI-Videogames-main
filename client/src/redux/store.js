// import { createStore, applyMiddleware, compose } from "redux";
// import rootReducer from "./reducer";//Realizado este primer paso vamos a darle funcionalidad a nuestra reducer
// import thunkMiddleware from "redux-thunk";


// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// //Esta linea nos permite conectar con la extension del navegador >>> REDUX DEVTOOLS

// const store = createStore(
//     rootReducer,
//     composeEnhancer(applyMiddleware(thunkMiddleware))
// );
//Nuestra store nos va permitir hacer peticiones al server, funcionando como un interlocutor entre las peticiones del cliente al servidor

//Utilizo esta store, que me solucione el problema de redux <--Los estados llegaban vacios-->
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
//import * as thunkMiddleware from "react-redux";
import rootReducer from "./reducer";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;