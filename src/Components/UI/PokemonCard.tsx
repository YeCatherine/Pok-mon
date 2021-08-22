import React from "react";
import {Link} from "react-router-dom";
import PokemonImage from "./PokemonImage";
import CaptureButton from "./CaptureButton";
import IPokemonSimpleComponent from "../../Types/IPokemonSimpleComponent";

/**
 * The pokemon card.
 *
 * @param props Pokemon.
 *
 * @constructor the functional component for pokemon card.
 */
const PokemonCard: React.FC<IPokemonSimpleComponent> = (props) => {
    const {pokemon} = props;
    if (!pokemon) return null;

    return (<div className="pokemon-card card text-dark text-center">
        <Link className="card-header"
              to={`/pokemon/${pokemon.name}`}>
            <PokemonImage pokemon={pokemon}/>
            <h2 className="pokemon-name"><span>{pokemon.name}</span></h2>
        </Link>
        <CaptureButton pokemon={pokemon}/>
    </div>)
}
export default PokemonCard;
