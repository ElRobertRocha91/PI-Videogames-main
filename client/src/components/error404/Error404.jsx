import React from "react";
import { Link } from "react-router-dom";

export default function Error404(){
    return(
        <div>
            <h3>Error 404</h3>
            <p>Page not found</p>
            <button>
                <Link to='/home'>Back to home</Link>
            </button>
        </div>
    )
}