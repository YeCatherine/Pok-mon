import React from "react";
import LanguageSwitcher from "../LanguageSwitcher";
import {Link} from "react-router-dom";

const Top = () => {
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-light bg-opacity-25 bg-dark fixed-top">
                <Link to={"https://gist.github.com/xcambar/c6438e7330584e42f71f2a51b8b367cc"}
                      className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center">
                    Pokédex Mission
                </Link>
                <Link to={"/"} className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center">Home</Link>
                <LanguageSwitcher/>
            </nav>
        </>
    )
}
export default Top;
