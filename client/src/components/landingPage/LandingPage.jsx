import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

export default function LandingPage () {
    return(
        <div className={style.landingPage}>
            <h4>Welcome player to</h4>
            <h1>Online Games</h1>
            <h4>Subscribe and search for your favorite game</h4>
            <Link to='/home'>
               <button>Click here</button>
            </Link>
        </div>
    )
}