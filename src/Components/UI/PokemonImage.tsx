import React from "react";
import {Image} from "react-bootstrap";
import {getIdFromURL} from "../../Services/Common";
import IPokemonSimpleComponent from "../../Types/IPokemonSimpleComponent";
import ReactImageFallback from 'react-image-fallback';

/**
 * Gets the image of the pokemon.
 * @param props
 * @constructor The functional component for PokemonImage.
 */
const PokemonImage: React.FC<IPokemonSimpleComponent> = (props) => {
    const {pokemon} = props;
    const id = getIdFromURL(props.pokemon.url);
    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    const fallbackImgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    return <ReactImageFallback
        src={imgUrl}
        fallbackImage={fallbackImgUrl}
        initialImage="loader.gif"
        alt={pokemon.name}
        className="pokemon-main-image"/>
}

export default PokemonImage;
