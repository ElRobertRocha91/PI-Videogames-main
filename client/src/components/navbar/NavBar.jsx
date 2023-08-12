import React from "react";
import { Link } from "react-router-dom";

export default function NavBar(){
    return(
        <nav>
            <div>
                <h6>Online Games</h6>
                <Link to='/'>Landimg Page</Link>
                <Link to='/about'>About</Link>
            </div>
        </nav>
    )
}