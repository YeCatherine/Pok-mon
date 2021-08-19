import React from "react";
import PokeComponentType from "../Types/PokeComponentType";
import useLocalStorage from "../Hooks/useLocalStorage";
import IPokemonData from "../Types/Pokemon";
import {ListGroup as Lg} from "react-bootstrap";
import CaptureButton from "./CaptureButton";
import PokemonImage from "./PokemonImage";
import {Link} from "react-router-dom";

/**
 * Functional component for list of captured pokemon.
 * @param props Captured pokemon.
 * @constructor of CapturedPokemons.
 */
const CapturedPokemons: React.FC<PokeComponentType> = (props) => {
    const {checkCapturedPokemon, setCapturePokemon} = props;
    const [capturedPokemonList] = useLocalStorage<Array<IPokemonData>>('capturedPokemonList', []);
    const list = capturedPokemonList.map((currentPokemon, index) =>
        (<div  className="card text-dark text-center card-header" key={index}>
                <PokemonImage pokemon={currentPokemon}/>
                <Link className="card-header"
                      to={`/pokemon/${currentPokemon.name}`}>{currentPokemon.name}</Link>
                <CaptureButton pokemon={currentPokemon} checkCapturedPokemon={checkCapturedPokemon}
                               setCapturePokemon={setCapturePokemon}/>

        </div>)
    );

    return (
            <div >
                <h3>Captured Pokemon List</h3>
                <div className="list-group flex-row">
                    {list}
                </div>
            </div>
    );
}
export default CapturedPokemons;
