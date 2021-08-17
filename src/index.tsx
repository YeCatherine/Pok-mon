import React from 'react';
import ReactDOM from 'react-dom';
import PokemonList from "./Components/PokemonList";
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <PokemonList />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
