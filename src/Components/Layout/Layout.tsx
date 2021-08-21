import React from "react";
import { BrowserRouter as Router} from 'react-router-dom'
import Top from './Top';
import Footer from './Footer';

/**
 * Main Layout component.
 *
 * @param children
 *
 * @constructor
 */
const Layout:React.FC = ({ children }) => {
    return (
        <Router>
            <Top />
            <main>{children}</main>
            <Footer />
        </Router>
    )
}

export default Layout