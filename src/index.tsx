import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from "react-router-dom";
import PokemonList from "./Components/PokemonList";
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Route path="/" component={PokemonList} exact />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
