import React from "react";
import PokemonImage from "./PokemonImage";
import {Link} from "react-router-dom";
import CaptureButton from "./CaptureButton";
import PokeComponentType from "../../Types/PokeComponentType";

/**
 * The pokemon card.
 *
 * @param props Pokemon.
 *
 * @constructor the functional component for pokemon card.
 */
const PokemonCard: React.FC<PokeComponentType> = (props) => {
    const {pokemon, checkCapturedPokemon, setCapturePokemon} = props;
    if (!pokemon) return null;

    return (<div className="card text-dark text-center">
        <Link className="card-header"
              to={`/pokemon/${pokemon.name}`}>
            <PokemonImage pokemon={pokemon}/>
            {pokemon.name}
        </Link>
        {checkCapturedPokemon && setCapturePokemon &&
        <CaptureButton pokemon={pokemon}
                       checkCapturedPokemon={checkCapturedPokemon}
                       setCapturePokemon={setCapturePokemon}/>}
    </div>)
}
export default PokemonCard;
