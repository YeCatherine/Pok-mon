import React from "react";
import {Link} from "react-router-dom";
import PokemonImage from "./PokemonImage";
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
    const {pokemon} = props;
    if (!pokemon) return null;

    return (<div className="card text-dark text-center">
        <Link className="card-header"
              to={`/pokemon/${pokemon.name}`}>
            <PokemonImage pokemon={pokemon}/>
            {pokemon.name}
        </Link>
        <CaptureButton pokemon={pokemon}/>
    </div>)
}
export default PokemonCard;
