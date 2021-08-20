import React, {useState} from 'react';
import './App.css';
import useLocalStorage from "./Hooks/useLocalStorage";
import IPokemonData from "./Types/Pokemon";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PokemonList from "./Components/PokemonList";
import PokemonPage from "./Components/PokemonPage";
import PokemonMovePage from "./Components/PokemonMovePage";
import 'bootstrap/dist/css/bootstrap.min.css';
import Top from "./Components/Layout/Top";
import {MyGlobalContext} from './Services/Context'

/**
 * The App functional component.
 * @constructor
 */
function App() {

    const [capturedPokemonList, setCapturedPokemonList] = useLocalStorage<Array<IPokemonData>>('capturedPokemonList', []);

    /**
     * Checks if the pokemon is captured.
     * @param pokemon The pokemon.
     */
    const checkCapturedPokemon = (pokemon: IPokemonData) => {
        const finding = capturedPokemonList.find(currentPokemon => currentPokemon.name === pokemon.name);
        return typeof finding === 'object';
    }

    /**
     * Sets the pokemon to captured list if the pokemon is captured.
     * @param pokemon The pokemon.
     */
    const setCapturePokemon = (pokemon: IPokemonData) => {
        if (checkCapturedPokemon(pokemon)) {
            setCapturedPokemonList(capturedPokemonList.filter(currentPokemon => currentPokemon.name !== pokemon.name));
        } else {
            setCapturedPokemonList([...capturedPokemonList, pokemon])
        }
    }

    const [language, setLanguage] = useState<string>('en')

    return (
        <div className="App">
            <MyGlobalContext.Provider value={{language, setLanguage}}>
                <Top/>
                <Router>
                    <Switch>
                        <Route path="/" exact>
                            <PokemonList checkCapturedPokemon={checkCapturedPokemon}
                                         setCapturePokemon={setCapturePokemon}/>
                        </Route>
                        <Route path="/pokemon/:name">
                            <PokemonPage/>
                        </Route>
                        <Route path="/move/:name">
                            <PokemonMovePage/>
                        </Route>
                    </Switch>
                </Router>
            </MyGlobalContext.Provider>
        </div>
    );
}

export default App;
