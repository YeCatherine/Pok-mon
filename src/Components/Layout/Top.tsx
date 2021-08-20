import React from "react";
import LanguageSwitcher from "../LanguageSwitcher";
import {useGlobalContext} from '../../Services/Context'


const Top = () => {
    const {language} = useGlobalContext()
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-light bg-opacity-25 bg-dark fixed-top">
                {language}
                <a href="https://gist.github.com/xcambar/c6438e7330584e42f71f2a51b8b367cc"
                   className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center">
                    National Pokédex
                </a>
                <a href="/" className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center">Home</a>
                <LanguageSwitcher/>
            </nav>
        </>
    )
}
export default Top;
