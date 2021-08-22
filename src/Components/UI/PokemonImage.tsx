import React from "react";
import {Image} from "react-bootstrap";
import {getIdFromURL} from "../../Services/Common";
import IPokemonSimpleComponent from "../../Types/IPokemonSimpleComponent";

/**
 * Gets the image of the pokemon.
 * @param props
 * @constructor The functional component for PokemonImage.
 */
const PokemonImage: React.FC<IPokemonSimpleComponent> = (props) => {
    const id = getIdFromURL(props.pokemon.url);
    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    return <Image alt={props.pokemon.name} src={imgUrl} roundedCircle/>
}

export default PokemonImage;
