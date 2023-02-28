import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
//import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";

//const root = ReactDOM.createRoot(document.getElementById('root'));
  
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </Provider>
  , document.getElementById('root')
);

//Realizada esta root ya tenemos hecha la conección entre redux y react. La misma es realizada por Provider