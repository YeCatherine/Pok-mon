import React from "react";
import LanguageSwitcher from "../UI/LanguageSwitcher";
import {Link} from "react-router-dom";

const Header: React.FC = () => {
    return (
        <nav
            className="navbar navbar-expand-md navbar-light bg-opacity-25 bg-dark fixed-top">
            <Link to={"/"}
                  className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center">Home</Link>
            <LanguageSwitcher/>
        </nav>
    )
}
export default Header;
