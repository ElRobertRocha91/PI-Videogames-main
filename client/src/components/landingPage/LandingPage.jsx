import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

export default function LandingPage () {
    return(
        <div className={style.container1}>
                    <div className={style.text}>
                        <h6>Welcome to</h6>
                        <h4>Online Games</h4>
                      <Link to='/home'>
                        <button className={style.button}>
                          Click here
                        </button>
                      </Link>
                    </div>  
        </div>
    )
}